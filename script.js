
// Function to open vaccine information in a new tab
function openVaccineInfo(vaccine) {
  let url = '';
  
  // Map vaccine names to their information URLs
  switch(vaccine) {
    case "Influenza vaccine":
      url = "https://www.cdc.gov/flu/vaccines/keyfacts.html?CDC_AAref_Val=https://www.cdc.gov/flu/prevent/keyfacts.htm";
      break;
    case "COVID vaccine":
      url = "https://www.cdc.gov/covid/vaccines/how-they-work.html";
      break;
    case "Tdap vaccine":
      url = "https://www.cdc.gov/vaccines/hcp/current-vis/tdap.html?CDC_AAref_Val=https://www.cdc.gov/vaccines/hcp/vis/vis-statements/tdap.html";
      break;
    case "Hepatitis A series":
      url = "https://www.cdc.gov/hepatitis-a/vaccination/index.html";
      break;
    case "Hepatitis B series":
      url = "https://www.cdc.gov/hepatitis-b/vaccination/index.html";
      break;
    case "Shingles vaccine":
      url = "https://www.cdc.gov/shingles/vaccines/?CDC_AAref_Val=https://www.cdc.gov/vaccines/vpd/shingles/public/shingrix/index.html";
      break;
    case "Pneumococcal vaccine":
      url = "https://www.cdc.gov/vaccines/vpd/pneumo/public/index.html";
      break;
    case "RSV vaccine":
      url = "https://www.cdc.gov/rsv/vaccines/index.html";
      break;
    case "Meningococcal vaccine, ACWY + B Series":
    case "Meningococcal vaccine, ACWY":
      url = "https://www.cdc.gov/vaccines/vpd/mening/public/index.html";
      break;
    case "Hib vaccine":
      url = "https://www.cdc.gov/vaccines/vpd/hib/public/index.html";
      break;
    case "HPV vaccine":
      url = "https://www.cdc.gov/vaccines/vpd/hpv/public/index.html";
      break;
    default:
      url = "https://www.cdc.gov/vaccines/index.html";
  }
  
  // Open the URL in a new tab
  window.open(url, '_blank');
}

document.addEventListener('DOMContentLoaded', () => {
  const fluInput = document.getElementById('flu-input');
  const covidInput = document.getElementById('covid-input');
  const tdapInput = document.getElementById('tdap-input');
  const hepaInput = document.getElementById('hepa-input');
  const hepbInput = document.getElementById('hepb-input');
  const zosterInput = document.getElementById('zoster-input');
  const pneumoInput = document.getElementById('pneumo-input');
  const rsvInput = document.getElementById('rsv-input');
  const meningococcalInput = document.getElementById('meningococcal-input');
  const hibInput = document.getElementById('hib-input');
  const hpvInput = document.getElementById('hpv-input');
  const cirrhosisInput = document.getElementById('cirrhosis-input');
  const hivInput = document.getElementById('hiv-input');
  const aspleniaInput = document.getElementById('asplenia-input');
  const immunosuppressedInput = document.getElementById('immunosuppressed-input');
  const ageInput = document.getElementById('age');


  const outputSection = document.getElementById('output-section');

  function updateRecommendations() {
    let recommendations = [];

    if (!fluInput.checked) recommendations.push("Influenza vaccine");
    if (!covidInput.checked) recommendations.push("COVID vaccine");
    if (!tdapInput.checked) recommendations.push("Tdap vaccine");
    if (!hepbInput.checked) recommendations.push("Hepatitis B series");

    if (!pneumoInput.checked) recommendations.push("Pneumococcal vaccine");

    if (aspleniaInput.checked && !meningococcalInput.checked) {
      recommendations.push("Meningococcal vaccine, ACWY + B Series");
    }

    if (hivInput.checked && !meningococcalInput.checked) {
      recommendations.push("Meningococcal vaccine, ACWY");
    }

    if (aspleniaInput.checked && !hibInput.checked) {
      recommendations.push("Hib vaccine");
    }

    if (ageInput.value >= 60 && !rsvInput.checked) {
      recommendations.push("RSV vaccine");
    }

    if (ageInput.value >= 19 && !zosterInput.checked) {
      recommendations.push("Shingles vaccine");
    }

    if (ageInput.value >= 15 && ageInput.value <= 27 && !hpvInput.checked) {
      recommendations.push("HPV vaccine");
    }

    if (cirrhosisInput.checked && !hepaInput.checked) {
      recommendations.push("Hepatitis A series");
    }

    if (hivInput.checked && !hepaInput.checked) {
      recommendations.push("Hepatitis A series");
    }

    outputSection.innerHTML = '<p class="recommended-heading">Recommended Vaccines:</p>' + 
      (recommendations.length ? '<ul>' + 
        recommendations.map(rec => `<li><a href="#" class="vaccine-link" data-vaccine="${rec}">${rec}</a></li>`).join('') + 
        '</ul>' : '<p>No additional vaccines needed</p>');
    
    // Add click event listeners to the vaccine links
    document.querySelectorAll('.vaccine-link').forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const vaccine = this.getAttribute('data-vaccine');
        openVaccineInfo(vaccine);
      });
    });
  }

 
  [fluInput, covidInput, tdapInput, hepaInput, hepbInput, zosterInput, 
   pneumoInput, rsvInput, meningococcalInput, hibInput, hpvInput, cirrhosisInput, hivInput, aspleniaInput, immunosuppressedInput, ageInput].forEach(input => {
    input.addEventListener('change', updateRecommendations);
  });


  updateRecommendations();
});
