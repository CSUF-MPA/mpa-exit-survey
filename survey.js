        // Survey navigation and logic
        let currentSection = 1;
        const totalSections = document.querySelectorAll('.section').length;
        let surveyData = {};

        // Initialize
        document.addEventListener('DOMContentLoaded', function() {
            // Check for saved progress
            var saved = localStorage.getItem('mpa_survey_data');
            if (saved) {
                try {
                    var parsed = JSON.parse(saved);
                    var age = Date.now() - parsed.timestamp;
                    var SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000;
                    if (age < SEVEN_DAYS) {
                        showResumePrompt(parsed);
                        return;
                    } else {
                        localStorage.removeItem('mpa_survey_data');
                    }
                } catch (e) {
                    localStorage.removeItem('mpa_survey_data');
                }
            }
            initSurvey();
        });

        function initSurvey() {
            updateProgress();
            setupEventListeners();
        }

        function showElement(element) {
            if (!element) return;
            element.hidden = false;
            element.classList.remove('is-hidden');
        }

        function hideElement(element) {
            if (!element) return;
            element.hidden = true;
            element.classList.add('is-hidden');
        }

        function getErrorTarget(field) {
            return field.type === 'radio' ? field.closest('fieldset') : field;
        }

        function getErrorId(field) {
            return 'error-' + field.name.replace(/\[\]/g, '').replace(/[^a-zA-Z0-9_-]/g, '-');
        }

        function setFieldError(field, message) {
            var target = getErrorTarget(field);
            if (!target) return;

            var errorId = getErrorId(field);
            var error = document.getElementById(errorId);
            if (!error) {
                error = document.createElement('p');
                error.id = errorId;
                error.className = 'field-error';
                target.insertAdjacentElement('afterend', error);
            }

            error.textContent = message;
            target.setAttribute('aria-invalid', 'true');
            target.setAttribute('aria-describedby', errorId);
            if (field.type !== 'radio') {
                field.classList.add('is-invalid');
            }
        }

        function clearFieldError(field) {
            var target = getErrorTarget(field);
            if (!target) return;

            var error = document.getElementById(getErrorId(field));
            if (error) {
                error.remove();
            }

            target.removeAttribute('aria-invalid');
            target.removeAttribute('aria-describedby');
            if (field.type !== 'radio') {
                field.classList.remove('is-invalid');
            }
        }

        function getFieldErrorMessage(field) {
            if (field.type === 'radio') {
                return 'Select one option for this question.';
            }

            if (field.validity.valueMissing) {
                return 'Complete this required field.';
            }

            if (field.type === 'email' && field.validity.typeMismatch) {
                return 'Enter a valid email address or leave this field blank.';
            }

            return field.validationMessage || 'Correct this field before continuing.';
        }

        function showResumePrompt(parsed) {
            var overlay = document.createElement('div');
            overlay.className = 'resume-overlay';
            overlay.setAttribute('role', 'dialog');
            overlay.setAttribute('aria-modal', 'true');
            overlay.setAttribute('aria-labelledby', 'resumeDialogTitle');
            overlay.innerHTML =
                '<div class="resume-dialog">' +
                    '<h3 id="resumeDialogTitle">Resume Previous Session?</h3>' +
                    '<p>You have a saved survey in progress. Would you like to pick up where you left off?</p>' +
                    '<div class="button-group">' +
                        '<button type="button" class="btn-primary" id="resumeBtn">Resume</button>' +
                        '<button type="button" class="btn-secondary" id="startFreshBtn">Start Fresh</button>' +
                    '</div>' +
                '</div>';
            document.body.appendChild(overlay);

            var resumeBtn = document.getElementById('resumeBtn');
            var startFreshBtn = document.getElementById('startFreshBtn');

            resumeBtn.focus();

            resumeBtn.addEventListener('click', function() {
                surveyData = parsed.data || {};
                currentSection = Math.min(Math.max(parsed.section || 1, 1), totalSections);
                initSurvey();
                restoreFormData(surveyData);
                showSection(currentSection);
                overlay.remove();
            });

            startFreshBtn.addEventListener('click', function() {
                localStorage.removeItem('mpa_survey_data');
                overlay.remove();
                initSurvey();
            });

            // Trap focus within dialog
            overlay.addEventListener('keydown', function(e) {
                if (e.key === 'Tab') {
                    var focusable = overlay.querySelectorAll('button');
                    var first = focusable[0];
                    var last = focusable[focusable.length - 1];
                    if (e.shiftKey && document.activeElement === first) {
                        e.preventDefault();
                        last.focus();
                    } else if (!e.shiftKey && document.activeElement === last) {
                        e.preventDefault();
                        first.focus();
                    }
                }
                if (e.key === 'Escape') {
                    startFreshBtn.click();
                }
            });
        }

        function restoreFormData(data) {
            for (var key in data) {
                var value = data[key];
                if (Array.isArray(value)) {
                    // Checkboxes
                    value.forEach(function(v) {
                        var cb = document.querySelector('input[name="' + key + '"][value="' + v + '"]');
                        if (cb) cb.checked = true;
                    });
                } else {
                    // Try radio first
                    var radio = document.querySelector('input[type="radio"][name="' + key + '"][value="' + value + '"]');
                    if (radio) {
                        radio.checked = true;
                        // Trigger change event for skip logic
                        radio.dispatchEvent(new Event('change', { bubbles: true }));
                    } else {
                        // Text/textarea/select
                        var field = document.querySelector('[name="' + key + '"]');
                        if (field && (field.tagName === 'INPUT' || field.tagName === 'TEXTAREA' || field.tagName === 'SELECT')) {
                            field.value = value;
                        }
                    }
                }
            }
        }

        function setupEventListeners() {
            // Next button
            document.getElementById('nextBtn').addEventListener('click', function() {
                if (validateCurrentSection()) {
                    saveCurrentSection();
                    if (currentSection < totalSections) {
                        currentSection++;
                        showSection(currentSection);
                        updateProgress();
                    }
                }
            });

            // Previous button
            document.getElementById('prevBtn').addEventListener('click', function() {
                if (currentSection > 1) {
                    saveCurrentSection();
                    currentSection--;
                    showSection(currentSection);
                    updateProgress();
                }
            });

            document.getElementById('surveyForm').addEventListener('submit', function(e) {
                e.preventDefault();

                if (!validateCurrentSection()) {
                    return;
                }

                saveCurrentSection();

                if (currentSection < totalSections) {
                    currentSection++;
                    showSection(currentSection);
                    updateProgress();
                } else {
                    saveCurrentSection();
                    submitSurvey();
                }
            });

            // Download buttons
            document.getElementById('downloadBtn').addEventListener('click', function() {
                downloadCSV();
            });
            document.getElementById('fallbackDownloadBtn').addEventListener('click', function() {
                downloadCSV();
            });

            document.getElementById('skipSectionBtn').addEventListener('click', function() {
                skipSection();
            });

            // Skip logic for employment during program
            document.querySelectorAll('input[name="employment_during_program"]').forEach(function(radio) {
                radio.addEventListener('change', function() {
                    var otherInput = document.querySelector('input[name="employment_during_program_other"]');
                    if (this.value === 'other') {
                        showElement(otherInput);
                        otherInput.required = true;
                    } else {
                        hideElement(otherInput);
                        otherInput.required = false;
                        otherInput.value = '';
                    }
                });
            });

            // Skip logic for current employment
            document.querySelectorAll('input[name="current_employment"]').forEach(function(radio) {
                radio.addEventListener('change', function() {
                    var employmentDetails = document.getElementById('employment_details');
                    var otherInput = document.querySelector('input[name="current_employment_other"]');

                    if (this.value === 'other') {
                        showElement(otherInput);
                        otherInput.required = true;
                    } else {
                        hideElement(otherInput);
                        otherInput.required = false;
                        otherInput.value = '';
                    }

                    // Show employment details if employed
                    if (['public_full_time', 'nonprofit_full_time', 'private_full_time', 'part_time', 'self_employed'].includes(this.value)) {
                        showElement(employmentDetails);
                    } else {
                        hideElement(employmentDetails);
                        document.querySelector('input[name="job_title"]').value = '';
                        document.querySelector('input[name="organization"]').value = '';
                        document.querySelector('select[name="salary_range"]').value = '';
                        document.querySelectorAll('input[name="job_source"]').forEach(function(r) { r.checked = false; });
                        document.querySelectorAll('input[name="mpa_utilization"]').forEach(function(r) { r.checked = false; });
                    }
                });
            });

            // Skip logic for job source other
            document.querySelectorAll('input[name="job_source"]').forEach(function(radio) {
                radio.addEventListener('change', function() {
                    var otherInput = document.querySelector('input[name="job_source_other"]');
                    if (this.value === 'other') {
                        showElement(otherInput);
                    } else {
                        hideElement(otherInput);
                        otherInput.value = '';
                    }
                });
            });

            // Skip logic for improvement other
            document.querySelectorAll('input[name="improvement[]"]').forEach(function(checkbox) {
                checkbox.addEventListener('change', function() {
                    var otherInput = document.querySelector('input[name="improvement_other"]');
                    var otherCheckbox = Array.from(document.querySelectorAll('input[name="improvement[]"]'))
                        .find(function(cb) { return cb.value === 'other'; });

                    if (otherCheckbox && otherCheckbox.checked) {
                        showElement(otherInput);
                    } else {
                        hideElement(otherInput);
                        otherInput.value = '';
                    }
                });
            });

            // Skip logic for connection method other
            document.querySelectorAll('input[name="connection_method[]"]').forEach(function(checkbox) {
                checkbox.addEventListener('change', function() {
                    var otherInput = document.querySelector('input[name="connection_method_other"]');
                    var otherCheckbox = Array.from(document.querySelectorAll('input[name="connection_method[]"]'))
                        .find(function(cb) { return cb.value === 'other'; });

                    if (otherCheckbox && otherCheckbox.checked) {
                        showElement(otherInput);
                    } else {
                        hideElement(otherInput);
                        otherInput.value = '';
                    }
                });
            });
        }

        function skipSection() {
            if (currentSection < totalSections) {
                saveCurrentSection();
                currentSection++;
                showSection(currentSection);
                updateProgress();
            }
        }

        function showSection(sectionNum) {
            document.querySelectorAll('.section').forEach(function(section) {
                section.classList.remove('active');
            });

            var targetSection = document.querySelector('.section[data-section="' + sectionNum + '"]');
            if (targetSection) {
                targetSection.classList.add('active');

                if (sectionNum === totalSections) {
                    buildReview();
                }

                // Move focus to section heading for accessibility
                var heading = targetSection.querySelector('.section-title');
                if (heading) {
                    heading.focus();
                    document.title = heading.textContent + ' - CSUF MPA Exit Survey';
                }
            }

            // Update button visibility
            document.getElementById('prevBtn').hidden = sectionNum <= 1;
            document.getElementById('nextBtn').hidden = sectionNum >= totalSections;
            document.getElementById('submitBtn').hidden = sectionNum !== totalSections;

            // Scroll to top
            var motionOk = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            window.scrollTo({ top: 0, behavior: motionOk ? 'smooth' : 'auto' });
        }

        function updateProgress() {
            var progress = (currentSection / totalSections) * 100;
            document.getElementById('progressBar').style.width = progress + '%';

            // Update ARIA with honest values
            var container = document.querySelector('.progress-container');
            container.setAttribute('aria-valuenow', currentSection);
            container.setAttribute('aria-valuemax', totalSections);
            container.setAttribute('aria-label', 'Survey progress: Section ' + currentSection + ' of ' + totalSections);
        }

        function validateCurrentSection() {
            var currentSectionElement = document.querySelector('.section[data-section="' + currentSection + '"]');
            var fields = currentSectionElement.querySelectorAll('input, select, textarea');

            var isValid = true;
            var firstInvalidField = null;
            var checkedRadioGroups = new Set();

            fields.forEach(function(field) {
                // Skip validation for hidden fields
                if (field.closest('[hidden]') || field.offsetParent === null) {
                    return;
                }

                // Check radio buttons
                if (field.type === 'radio') {
                    if (!field.required || checkedRadioGroups.has(field.name)) {
                        if (!field.required) {
                            clearFieldError(field);
                        }
                        return;
                    }
                    checkedRadioGroups.add(field.name);

                    var radioGroup = currentSectionElement.querySelectorAll('[name="' + field.name + '"]');
                    var isChecked = Array.from(radioGroup).some(function(radio) { return radio.checked; });
                    if (!isChecked) {
                        isValid = false;
                        setFieldError(field, getFieldErrorMessage(field));
                        if (!firstInvalidField) {
                            firstInvalidField = field;
                        }
                    } else {
                        clearFieldError(field);
                    }
                }
                // Check required text fields and type-specific constraints like email.
                else if (!field.checkValidity()) {
                    isValid = false;
                    setFieldError(field, getFieldErrorMessage(field));
                    if (!firstInvalidField) {
                        firstInvalidField = field;
                    }
                } else {
                    clearFieldError(field);
                }
            });

            if (!isValid) {
                showError('Please complete all required fields and correct any invalid entries before proceeding.');
                if (firstInvalidField) {
                    var motionOk = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
                    firstInvalidField.scrollIntoView({ behavior: motionOk ? 'smooth' : 'auto', block: 'center' });
                    firstInvalidField.focus({ preventScroll: true });
                }
            } else {
                hideError();
            }

            return isValid;
        }

        function saveCurrentSection() {
            var currentSectionElement = document.querySelector('.section[data-section="' + currentSection + '"]');
            var inputs = currentSectionElement.querySelectorAll('input, select, textarea');

            // Reset all fields in this section first so skipped or unchecked controls do not leave stale saved values.
            inputs.forEach(function(input) {
                delete surveyData[input.name];
            });

            inputs.forEach(function(input) {
                if (input.closest('[hidden]')) {
                    return;
                }

                if (input.type === 'radio') {
                    if (input.checked) {
                        surveyData[input.name] = input.value;
                    }
                } else if (input.type === 'checkbox') {
                    if (!surveyData[input.name]) {
                        surveyData[input.name] = [];
                    }
                    if (input.checked) {
                        surveyData[input.name].push(input.value);
                    }
                } else {
                    surveyData[input.name] = input.value;
                }
            });

            // Save to localStorage
            try {
                localStorage.setItem('mpa_survey_data', JSON.stringify({
                    data: surveyData,
                    section: currentSection,
                    timestamp: Date.now()
                }));
            } catch (e) {
                // localStorage may be unavailable; continue without saving
            }
        }

        function getControlQuestion(control) {
            var row = control.closest('tr');
            if (row) {
                var rowHeading = row.querySelector('th[scope="row"]');
                if (rowHeading) {
                    return rowHeading.textContent.trim().replace(/\s+/g, ' ');
                }
            }

            if (control.id) {
                var explicitLabel = document.querySelector('label[for="' + control.id + '"]');
                if (explicitLabel) {
                    return explicitLabel.textContent.trim().replace(/\s+/g, ' ');
                }
            }

            var fieldset = control.closest('fieldset');
            if (fieldset) {
                var legend = fieldset.querySelector('legend');
                if (legend) {
                    return legend.textContent.trim().replace(/\s+/g, ' ');
                }
            }

            if (control.getAttribute('aria-label')) {
                return control.getAttribute('aria-label').trim();
            }

            return control.name.replace(/\[\]/g, '').replace(/_/g, ' ');
        }

        function getChoiceLabel(control) {
            var ariaLabel = control.getAttribute('aria-label');
            if (ariaLabel && ariaLabel.includes(':')) {
                return ariaLabel.split(':').slice(1).join(':').trim();
            }

            var label = control.closest('label');
            if (label) {
                return label.textContent.trim().replace(/\s+/g, ' ');
            }

            return control.value;
        }

        function getReviewValue(name, value) {
            if (Array.isArray(value)) {
                return value.map(function(item) {
                    var checkbox = document.querySelector('input[type="checkbox"][name="' + name + '"][value="' + item + '"]');
                    return checkbox ? getChoiceLabel(checkbox) : item;
                }).join('; ');
            }

            var radio = document.querySelector('input[type="radio"][name="' + name + '"][value="' + value + '"]');
            if (radio) {
                return getChoiceLabel(radio);
            }

            var select = document.querySelector('select[name="' + name + '"]');
            if (select && select.selectedOptions.length) {
                return select.selectedOptions[0].textContent.trim();
            }

            return value;
        }

        function appendReviewItem(list, label, value) {
            var term = document.createElement('dt');
            term.textContent = label;

            var description = document.createElement('dd');
            description.textContent = value;

            list.appendChild(term);
            list.appendChild(description);
        }

        function buildReview() {
            var reviewContent = document.getElementById('reviewContent');
            reviewContent.textContent = '';

            document.querySelectorAll('.section:not([data-section="' + totalSections + '"])').forEach(function(section) {
                var list = document.createElement('dl');
                list.className = 'review-list';
                var includedNames = new Set();

                section.querySelectorAll('input, select, textarea').forEach(function(control) {
                    if (!control.name || control.type === 'hidden' || includedNames.has(control.name)) {
                        return;
                    }

                    if (!(control.name in surveyData)) {
                        return;
                    }

                    var value = surveyData[control.name];
                    if (Array.isArray(value) && value.length === 0) {
                        return;
                    }

                    if (!Array.isArray(value) && String(value).trim() === '') {
                        return;
                    }

                    includedNames.add(control.name);
                    appendReviewItem(list, getControlQuestion(control), getReviewValue(control.name, value));
                });

                if (list.children.length) {
                    var wrapper = document.createElement('section');
                    wrapper.className = 'review-section';

                    var heading = document.createElement('h3');
                    heading.textContent = section.querySelector('.section-title').textContent;

                    wrapper.appendChild(heading);
                    wrapper.appendChild(list);
                    reviewContent.appendChild(wrapper);
                }
            });

            if (!reviewContent.children.length) {
                var emptyMessage = document.createElement('p');
                emptyMessage.textContent = 'No responses have been entered yet.';
                reviewContent.appendChild(emptyMessage);
            }
        }

        function submitSurvey() {
            // Add timestamp
            surveyData['submission_date'] = new Date().toISOString();
            surveyData['form_version'] = '2';

            // Map contact_email to Formspree's _replyto field
            if (surveyData['contact_email']) {
                surveyData['_replyto'] = surveyData['contact_email'];
            }

            // Prepare data for Formspree
            var formData = new FormData();
            for (var key in surveyData) {
                var value = surveyData[key];
                if (Array.isArray(value)) {
                    value = value.join('; ');
                }
                formData.append(key, value);
            }

            // Disable submit button to prevent double submission
            var submitBtn = document.getElementById('submitBtn');
            submitBtn.disabled = true;
            submitBtn.textContent = 'Submitting...';

            // Submit to Formspree
            fetch('https://formspree.io/f/mblzqjjl', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(function(response) {
                if (response.ok) {
                    // Clear saved progress
                    localStorage.removeItem('mpa_survey_data');

                    // Success - hide form, intro, and progress bar; show completion message
                    hideElement(document.getElementById('surveyForm'));
                    hideElement(document.querySelector('.intro-text'));
                    hideElement(document.querySelector('.progress-container'));
                    var completionMsg = document.getElementById('completionMessage');
                    completionMsg.classList.add('active');

                    // Move focus to completion heading
                    var completionHeading = completionMsg.querySelector('h2');
                    completionHeading.focus();
                } else {
                    response.json().then(function() {
                        showError('There was a problem submitting your survey. Please download your responses and email them to the program director.');
                        submitBtn.disabled = false;
                        submitBtn.textContent = 'Submit Survey';
                        showElement(document.getElementById('fallbackDownloadBtn'));
                    });
                }
            })
            .catch(function() {
                showError('Network error. Please check your connection and try again, or download your responses and email them.');
                submitBtn.disabled = false;
                submitBtn.textContent = 'Submit Survey';
                showElement(document.getElementById('fallbackDownloadBtn'));
            });
        }

        function downloadCSV() {
            var csv = convertToCSV(surveyData);
            var blob = new Blob([csv], { type: 'text/csv' });
            var url = window.URL.createObjectURL(blob);
            var a = document.createElement('a');
            a.setAttribute('hidden', '');
            a.setAttribute('href', url);
            a.setAttribute('download', 'mpa_exit_survey_' + new Date().getTime() + '.csv');
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }

        function convertToCSV(data) {
            var csv = 'Field,Value\n';

            for (var key in data) {
                var value = data[key];
                if (Array.isArray(value)) {
                    value = value.join('; ');
                }
                value = String(value).replace(/"/g, '""');
                csv += '"' + key + '","' + value + '"\n';
            }

            return csv;
        }

        function showError(message) {
            var errorDiv = document.getElementById('errorMessage');
            errorDiv.textContent = message;
            errorDiv.classList.add('active');
            var motionOk = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            errorDiv.scrollIntoView({ behavior: motionOk ? 'smooth' : 'auto', block: 'nearest' });
        }

        function hideError() {
            var errorDiv = document.getElementById('errorMessage');
            errorDiv.classList.remove('active');
        }
