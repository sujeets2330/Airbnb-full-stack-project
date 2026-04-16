// Enhanced Tax Toggle Functionality
(function initTaxToggle() {
    'use strict';
    
    // Get all toggle switches
    const taxSwitches = document.querySelectorAll("#flexSwitchCheckDefault, #flexSwitchCheckDefaultS");
    const changeAfterLabels = document.querySelectorAll(".changeAfter");
    
    // Function to update tax display
    const updateTaxDisplay = (showTax) => {
        const taxInfoElements = document.getElementsByClassName("tax-info");
        const priceInfoElements = document.getElementsByClassName("price-info");
        
        // Update tax info elements
        Array.from(taxInfoElements).forEach(tax => {
            tax.style.display = showTax ? "inline" : "none";
        });
        
        // Update price info elements
        Array.from(priceInfoElements).forEach(price => {
            price.style.display = showTax ? "none" : "inline";
        });
        
        // Update label text on all changeAfter elements
        const labelText = showTax ? "Display total after taxes" : "Display total before taxes";
        changeAfterLabels.forEach(label => {
            if (label) label.textContent = labelText;
        });
        
        // Save preference to localStorage
        localStorage.setItem("taxToggleState", showTax ? "after" : "before");
    };
    
    // Function to get current tax display state
    const getCurrentTaxState = () => {
        const taxInfoElements = document.getElementsByClassName("tax-info");
        if (taxInfoElements.length > 0) {
            return taxInfoElements[0].style.display === "inline";
        }
        return false;
    };
    
    // Toggle function
    const toggleTax = (event) => {
        const isChecked = event.target.checked;
        updateTaxDisplay(isChecked);
    };
    
    // Add event listeners to all switches
    taxSwitches.forEach(taxSwitch => {
        if (taxSwitch) {
            taxSwitch.addEventListener("click", toggleTax);
            taxSwitch.addEventListener("change", toggleTax); // For better compatibility
        }
    });
    
    // Load saved preference from localStorage
    const loadSavedPreference = () => {
        const savedState = localStorage.getItem("taxToggleState");
        if (savedState) {
            const shouldShowTax = savedState === "after";
            updateTaxDisplay(shouldShowTax);
            
            // Sync all switches
            taxSwitches.forEach(taxSwitch => {
                if (taxSwitch) taxSwitch.checked = shouldShowTax;
            });
        } else {
            // Default: hide tax info (show before taxes)
            updateTaxDisplay(false);
            taxSwitches.forEach(taxSwitch => {
                if (taxSwitch) taxSwitch.checked = false;
            });
        }
    };
    
    // Initialize
    loadSavedPreference();
    
    // Optional: Sync multiple switches when one changes
    const syncSwitches = () => {
        taxSwitches.forEach(taxSwitch => {
            if (taxSwitch) {
                taxSwitch.addEventListener('change', function() {
                    const isChecked = this.checked;
                    taxSwitches.forEach(otherSwitch => {
                        if (otherSwitch && otherSwitch !== this) {
                            otherSwitch.checked = isChecked;
                        }
                    });
                });
            }
        });
    };
    
    syncSwitches();
    
})();