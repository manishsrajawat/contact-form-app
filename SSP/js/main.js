// SSP Dashboard JavaScript

// Global state
let wizardData = {
    currentStep: 1,
    selectedPropertyType: null,
    propertyDetails: {},
    placements: [],
    creativeSettings: {},
    integrationCode: ''
};

// DOM Elements
const addPropertyBtn = document.getElementById('addPropertyBtn');
const addPropertyModal = document.getElementById('addPropertyModal');
const closeModalBtn = document.getElementById('closeModal');
const nextStep1Btn = document.getElementById('nextStep1');
const propertyTypeCards = document.querySelectorAll('.property-type-card');
const progressSteps = document.querySelectorAll('.progress-step');
const wizardSteps = document.querySelectorAll('.wizard-step');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
    initializeTooltips();
    animateCards();
});

// Event Listeners Setup
function setupEventListeners() {
    // Modal controls
    addPropertyBtn.addEventListener('click', openModal);
    closeModalBtn.addEventListener('click', closeModal);
    
    // Click outside modal to close
    addPropertyModal.addEventListener('click', function(e) {
        if (e.target === addPropertyModal) {
            closeModal();
        }
    });

    // Property type selection
    propertyTypeCards.forEach(card => {
        card.addEventListener('click', function() {
            selectPropertyType(this);
        });
    });

    // Wizard navigation
    nextStep1Btn.addEventListener('click', function() {
        if (wizardData.selectedPropertyType) {
            nextStep(2);
        }
    });

    // Refresh button
    document.getElementById('refreshBtn').addEventListener('click', function() {
        refreshDashboard();
    });

    // Navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            setActiveNavItem(this);
        });
    });
}

// Modal Functions
function openModal() {
    addPropertyModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    resetWizard();
}

function closeModal() {
    addPropertyModal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function resetWizard() {
    wizardData = {
        currentStep: 1,
        selectedPropertyType: null,
        propertyDetails: {},
        placements: [],
        creativeSettings: {},
        integrationCode: ''
    };
    
    // Reset UI
    showStep(1);
    updateProgressIndicator(1);
    propertyTypeCards.forEach(card => card.classList.remove('selected'));
    nextStep1Btn.disabled = true;
}

// Property Type Selection
function selectPropertyType(card) {
    // Remove selection from all cards
    propertyTypeCards.forEach(c => c.classList.remove('selected'));
    
    // Select clicked card
    card.classList.add('selected');
    wizardData.selectedPropertyType = card.dataset.type;
    
    // Enable next button
    nextStep1Btn.disabled = false;
    
    // Add click animation
    card.style.transform = 'scale(0.98)';
    setTimeout(() => {
        card.style.transform = '';
    }, 150);
}

// Wizard Navigation
function nextStep(stepNumber) {
    if (stepNumber <= 5) {
        wizardData.currentStep = stepNumber;
        showStep(stepNumber);
        updateProgressIndicator(stepNumber);
        
        // Load step content dynamically
        loadStepContent(stepNumber);
    }
}

function showStep(stepNumber) {
    wizardSteps.forEach(step => {
        step.style.display = 'none';
    });
    
    const targetStep = document.getElementById(`step${stepNumber}`);
    if (targetStep) {
        targetStep.style.display = 'block';
    }
}

function updateProgressIndicator(activeStep) {
    progressSteps.forEach((step, index) => {
        const stepNum = index + 1;
        
        step.classList.remove('active', 'completed');
        
        if (stepNum === activeStep) {
            step.classList.add('active');
        } else if (stepNum < activeStep) {
            step.classList.add('completed');
        }
    });
}

// Dynamic Step Content Loading
function loadStepContent(stepNumber) {
    switch(stepNumber) {
        case 2:
            loadPlacementCreationStep();
            break;
        case 3:
            loadCreativeSettingsStep();
            break;
        case 4:
            loadIntegrationStep();
            break;
        case 5:
            loadSummaryStep();
            break;
    }
}

function loadPlacementCreationStep() {
    const step2 = document.getElementById('step2');
    const propertyType = wizardData.selectedPropertyType;
    
    let placementTypes = [];
    let sizeOptions = [];
    
    switch(propertyType) {
        case 'website':
            placementTypes = ['Banner', 'Native', 'Video', 'Sticky', 'Outstream'];
            sizeOptions = ['728x90', '300x250', '320x50', '160x600', '970x250'];
            break;
        case 'mobile-app':
            placementTypes = ['Banner', 'Interstitial', 'Native', 'Rewarded Video', 'Playable'];
            sizeOptions = ['320x50', '300x250', '728x90', 'Fullscreen', '300x600'];
            break;
        case 'ctv':
            placementTypes = ['Pre-roll', 'Mid-roll', 'Post-roll', 'Ad Pod'];
            sizeOptions = ['15s', '30s', '60s', 'Custom'];
            break;
        case 'dooh':
            placementTypes = ['Screen Zone', 'Loop Slot', 'Takeover'];
            sizeOptions = ['1920x1080', '1080x1920', '3840x2160', 'Custom'];
            break;
    }
    
    step2.innerHTML = `
        <h3 style="margin-bottom: 2rem; color: var(--text-primary);">Create Placements</h3>
        
        <div class="placement-card">
            <div class="placement-header">
                <div class="placement-title">Placement #1</div>
                <div class="placement-type">${placementTypes[0]}</div>
            </div>
            
            <div class="form-row">
                <div class="form-group">
                    <label class="form-label">Placement Name</label>
                    <input type="text" class="form-input" placeholder="e.g., Homepage Banner" id="placementName1">
                </div>
                <div class="form-group">
                    <label class="form-label">Placement Type</label>
                    <select class="form-select" id="placementType1">
                        ${placementTypes.map(type => `<option value="${type.toLowerCase()}">${type}</option>`).join('')}
                    </select>
                </div>
            </div>
            
            <div class="form-row">
                <div class="form-group">
                    <label class="form-label">${propertyType === 'ctv' ? 'Duration' : 'Size/Format'}</label>
                    <select class="form-select" id="placementSize1">
                        ${sizeOptions.map(size => `<option value="${size}">${size}</option>`).join('')}
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">Frequency Cap</label>
                    <select class="form-select" id="frequencyCap1">
                        <option value="no-limit">No Limit</option>
                        <option value="1-per-session">1 per Session</option>
                        <option value="3-per-hour">3 per Hour</option>
                        <option value="5-per-day">5 per Day</option>
                    </select>
                </div>
            </div>
        </div>
        
        <div style="margin-top: 2rem;">
            <button class="btn btn-secondary" onclick="addPlacement()">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd"></path>
                </svg>
                Add Another Placement
            </button>
        </div>
        
        <div style="margin-top: 2rem; display: flex; justify-content: space-between;">
            <button class="btn btn-secondary" onclick="previousStep()">Back</button>
            <button class="btn btn-primary" onclick="nextStep(3)">Continue</button>
        </div>
    `;
}

function loadCreativeSettingsStep() {
    const step3 = document.getElementById('step3');
    const propertyType = wizardData.selectedPropertyType;
    
    step3.innerHTML = `
        <h3 style="margin-bottom: 2rem; color: var(--text-primary);">Creative Settings</h3>
        
        <div class="form-group">
            <label class="form-label">Allowed Creative Formats</label>
            <div class="checkbox-group">
                <label class="checkbox-item">
                    <input type="checkbox" checked> Banner Ads
                </label>
                <label class="checkbox-item">
                    <input type="checkbox" checked> Video Ads
                </label>
                <label class="checkbox-item">
                    <input type="checkbox"> Native Ads
                </label>
                <label class="checkbox-item">
                    <input type="checkbox"> Playable Ads
                </label>
            </div>
        </div>
        
        <div class="form-row">
            <div class="form-group">
                <label class="form-label">Max Video Length</label>
                <select class="form-select">
                    <option value="15">15 seconds</option>
                    <option value="30" selected>30 seconds</option>
                    <option value="60">60 seconds</option>
                    <option value="120">2 minutes</option>
                </select>
            </div>
            <div class="form-group">
                <label class="form-label">Max Creative Size</label>
                <select class="form-select">
                    <option value="150">150 KB</option>
                    <option value="500" selected>500 KB</option>
                    <option value="1000">1 MB</option>
                    <option value="3000">3 MB</option>
                </select>
            </div>
        </div>
        
        <div class="form-group">
            <label class="form-label">Blocked Categories</label>
            <div class="checkbox-group">
                <label class="checkbox-item">
                    <input type="checkbox"> Gambling
                </label>
                <label class="checkbox-item">
                    <input type="checkbox"> Politics
                </label>
                <label class="checkbox-item">
                    <input type="checkbox"> Adult Content
                </label>
                <label class="checkbox-item">
                    <input type="checkbox"> Alcohol
                </label>
            </div>
        </div>
        
        <div class="form-group">
            <label class="form-label">Creative Review</label>
            <select class="form-select">
                <option value="auto">Automatic Approval</option>
                <option value="manual">Manual Review Required</option>
            </select>
        </div>
        
        <div style="margin-top: 2rem; display: flex; justify-content: space-between;">
            <button class="btn btn-secondary" onclick="previousStep()">Back</button>
            <button class="btn btn-primary" onclick="nextStep(4)">Continue</button>
        </div>
    `;
}

function loadIntegrationStep() {
    const step4 = document.getElementById('step4');
    const propertyType = wizardData.selectedPropertyType;
    
    let integrationCode = generateIntegrationCode(propertyType);
    
    step4.innerHTML = `
        <h3 style="margin-bottom: 2rem; color: var(--text-primary);">Integration Code</h3>
        
        <p style="color: var(--text-secondary); margin-bottom: 2rem;">
            Copy and paste the following code into your ${propertyType === 'website' ? 'website' : 'application'}:
        </p>
        
        <div class="code-block">
            <div class="code-header">
                <span style="color: var(--text-secondary); font-size: 0.9rem;">
                    ${propertyType === 'website' ? 'JavaScript Tag' : 
                      propertyType === 'mobile-app' ? 'SDK Integration' : 
                      propertyType === 'ctv' ? 'VAST URL' : 'API Endpoint'}
                </span>
                <button class="copy-btn" onclick="copyToClipboard('integrationCode')">Copy</button>
            </div>
            <pre id="integrationCode">${integrationCode}</pre>
        </div>
        
        <div style="background: rgba(0, 255, 136, 0.1); border: 1px solid var(--success-green); border-radius: 12px; padding: 1rem; margin: 2rem 0;">
            <div style="display: flex; align-items: center; margin-bottom: 0.5rem;">
                <svg width="20" height="20" fill="var(--success-green)" viewBox="0 0 20 20" style="margin-right: 0.5rem;">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
                </svg>
                <strong style="color: var(--success-green);">Integration Tips</strong>
            </div>
            <ul style="color: var(--text-secondary); font-size: 0.9rem; margin-left: 1.5rem;">
                <li>Place the code before the closing &lt;/body&gt; tag</li>
                <li>Test on a staging environment first</li>
                <li>Monitor console for any errors</li>
            </ul>
        </div>
        
        <div style="margin-top: 2rem; display: flex; justify-content: space-between;">
            <button class="btn btn-secondary" onclick="previousStep()">Back</button>
            <button class="btn btn-primary" onclick="nextStep(5)">Continue</button>
        </div>
    `;
}

function loadSummaryStep() {
    const step5 = document.getElementById('step5');
    
    step5.innerHTML = `
        <h3 style="margin-bottom: 2rem; color: var(--text-primary);">Summary & Activation</h3>
        
        <div style="background: rgba(255, 255, 255, 0.05); border-radius: 16px; padding: 2rem; margin-bottom: 2rem;">
            <h4 style="color: var(--text-primary); margin-bottom: 1.5rem;">Property Summary</h4>
            
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 2rem;">
                <div>
                    <div style="margin-bottom: 1rem;">
                        <strong style="color: var(--accent-blue);">Property Type:</strong>
                        <div style="margin-top: 0.5rem; text-transform: capitalize;">${wizardData.selectedPropertyType?.replace('-', ' ')}</div>
                    </div>
                    <div style="margin-bottom: 1rem;">
                        <strong style="color: var(--accent-blue);">Placements:</strong>
                        <div style="margin-top: 0.5rem;">1 placement configured</div>
                    </div>
                </div>
                <div>
                    <div style="margin-bottom: 1rem;">
                        <strong style="color: var(--accent-blue);">Status:</strong>
                        <div style="margin-top: 0.5rem;">
                            <span class="card-status status-pending">Pending Activation</span>
                        </div>
                    </div>
                    <div style="margin-bottom: 1rem;">
                        <strong style="color: var(--accent-blue);">Integration:</strong>
                        <div style="margin-top: 0.5rem;">Code generated</div>
                    </div>
                </div>
            </div>
        </div>
        
        <div style="background: rgba(255, 107, 53, 0.1); border: 1px solid var(--warning-orange); border-radius: 12px; padding: 1rem; margin-bottom: 2rem;">
            <div style="display: flex; align-items: center; margin-bottom: 0.5rem;">
                <svg width="20" height="20" fill="var(--warning-orange)" viewBox="0 0 20 20" style="margin-right: 0.5rem;">
                    <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
                </svg>
                <strong style="color: var(--warning-orange);">Next Steps</strong>
            </div>
            <ul style="color: var(--text-secondary); font-size: 0.9rem; margin-left: 1.5rem;">
                <li>Implement the integration code on your ${wizardData.selectedPropertyType}</li>
                <li>Property will be reviewed within 24 hours</li>
                <li>You'll receive email confirmation once approved</li>
            </ul>
        </div>
        
        <div style="margin-top: 2rem; display: flex; justify-content: space-between;">
            <button class="btn btn-secondary" onclick="previousStep()">Back</button>
            <button class="btn btn-primary" onclick="activateProperty()" style="background: var(--success-green);">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
                Activate Property
            </button>
        </div>
    `;
}

function generateIntegrationCode(propertyType) {
    const propertyId = 'prop_' + Math.random().toString(36).substr(2, 9);
    
    switch(propertyType) {
        case 'website':
            return `<!-- SSP Ad Tag -->
<script>
  window.sspConfig = {
    propertyId: '${propertyId}',
    placements: {
      'homepage-banner': {
        id: 'placement-1',
        size: [728, 90],
        type: 'banner'
      }
    }
  };
</script>
<script src="https://cdn.ssppro.com/ssp.min.js" async></script>

<!-- Placement Container -->
<div id="ssp-placement-1"></div>`;

        case 'mobile-app':
            return `// iOS SDK Integration (Swift)
import SSPProSDK

// Initialize SDK in AppDelegate
func application(_ application: UIApplication, 
                didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
    SSPPro.initialize(propertyId: "${propertyId}")
    return true
}

// Load Banner Ad
let bannerAd = SSPBannerAd(placementId: "placement-1")
bannerAd.load()`;

        case 'ctv':
            return `<!-- VAST Tag URL -->
https://ad.ssppro.com/vast?property=${propertyId}&placement=placement-1

<!-- VMAP URL for Ad Pods -->
https://ad.ssppro.com/vmap?property=${propertyId}&duration=30&pods=3`;

        case 'dooh':
            return `// DOOH API Integration
const sspConfig = {
  propertyId: '${propertyId}',
  screenId: 'screen-001',
  location: {
    lat: 40.7128,
    lng: -74.0060
  }
};

// Fetch ad content
fetch('https://api.ssppro.com/dooh/ad-request', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(sspConfig)
})
.then(response => response.json())
.then(ad => displayAd(ad));`;

        default:
            return '// Integration code will be generated based on your property type';
    }
}

// Helper Functions
function previousStep() {
    if (wizardData.currentStep > 1) {
        nextStep(wizardData.currentStep - 1);
    }
}

function addPlacement() {
    // Add placement logic here
    showNotification('Placement added successfully!', 'success');
}

function activateProperty() {
    // Simulate property activation
    showNotification('Property activated successfully! You will receive email confirmation shortly.', 'success');
    setTimeout(() => {
        closeModal();
        addNewPropertyToGrid();
    }, 2000);
}

function addNewPropertyToGrid() {
    const grid = document.getElementById('propertiesGrid');
    const newCard = document.createElement('div');
    newCard.className = 'card';
    newCard.style.opacity = '0';
    newCard.style.transform = 'translateY(20px)';
    
    newCard.innerHTML = `
        <div class="card-header">
            <div>
                <h3 class="card-title">New ${wizardData.selectedPropertyType?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</h3>
                <p style="color: var(--text-secondary); font-size: 0.9rem; margin-top: 0.5rem;">
                    ${wizardData.selectedPropertyType?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())} • Just Created
                </p>
            </div>
            <span class="card-status status-pending">Pending</span>
        </div>
        <div class="card-metrics">
            <div class="metric">
                <div class="metric-value">$0</div>
                <div class="metric-label">Revenue</div>
            </div>
            <div class="metric">
                <div class="metric-value">0%</div>
                <div class="metric-label">Fill Rate</div>
            </div>
            <div class="metric">
                <div class="metric-value">$0.00</div>
                <div class="metric-label">eCPM</div>
            </div>
            <div class="metric">
                <div class="metric-value">0</div>
                <div class="metric-label">Impressions</div>
            </div>
        </div>
        <div style="margin-top: 1.5rem;">
            <button class="btn btn-secondary">View Details</button>
        </div>
    `;
    
    grid.appendChild(newCard);
    
    // Animate in
    setTimeout(() => {
        newCard.style.transition = 'all 0.5s ease';
        newCard.style.opacity = '1';
        newCard.style.transform = 'translateY(0)';
    }, 100);
}

function copyToClipboard(elementId) {
    const element = document.getElementById(elementId);
    const text = element.textContent;
    
    navigator.clipboard.writeText(text).then(() => {
        showNotification('Code copied to clipboard!', 'success');
    }).catch(() => {
        showNotification('Failed to copy code', 'error');
    });
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 2rem;
        right: 2rem;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(100%);
        transition: all 0.3s ease;
        ${type === 'success' ? 'background: var(--success-green);' : 
          type === 'error' ? 'background: var(--warning-orange);' : 
          'background: var(--accent-blue);'}
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

function refreshDashboard() {
    // Simulate dashboard refresh
    document.getElementById('refreshBtn').style.transform = 'rotate(360deg)';
    showNotification('Dashboard refreshed!', 'success');
    
    setTimeout(() => {
        document.getElementById('refreshBtn').style.transform = '';
    }, 500);
}

function setActiveNavItem(clickedLink) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    clickedLink.classList.add('active');
}

function viewProperty(propertyId) {
    showNotification(`Opening property details for ${propertyId}`, 'info');
}

function animateCards() {
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

function initializeTooltips() {
    // Add tooltips and enhance UX
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // ESC to close modal
    if (e.key === 'Escape' && addPropertyModal.classList.contains('active')) {
        closeModal();
    }
    
    // Ctrl/Cmd + K to open add property modal
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        openModal();
    }
});
