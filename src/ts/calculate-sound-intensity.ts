// /**
//  * Calculates both a numeric sound volume multiplier (0.0 to 1.0) 
//  * and a corresponding text description based on weather metrics.
//  * 
//  * @param {number} precip - Precipitation amount from Visual Crossing.
//  * @param {number} precipchance - Probability of rain (0 to 100).
//  * @param {number} precipcover - Coverage percentage (0 to 100).
//  * @param {string} [units='metric'] - 'metric' (mm) or 'us' (inches).
//  * @returns {Object} An object containing the text string and numeric volume.
//  */
// function getRainSoundSettings(precip, precipchance, precipcover, units = 'metric') {
//     // Default fallback object if there is no rain
//     if (precipchance < 15.0 || precip <= 0.0) {
//         return {
//             volume: 0.0,
//             string: "Dry / Silent Atmosphere"
//         };
//     }

//     // 1. Set the maximum expected rain cap to normalize our math (0.0 to 1.0)
//     // 25mm (1 inch) of rain per hour is treated as maximum speaker volume threshold
//     const maxRainThreshold = units.toLowerCase() === "us" ? 1.0 : 25.0;

//     // 2. Normalize the individual inputs into percentages (0 to 1)
//     const normalizedPrecip = Math.min(precip / maxRainThreshold, 1.0);
//     const chanceFactor = precipchance / 100;
//     const coverFactor = precipcover / 100;

//     // 3. Mathematical Formula to generate the final Audio Multiplier
//     // We mix volume weight with spatial density/chance
//     let calculatedVolume = normalizedPrecip * chanceFactor * coverFactor;
    
//     // Ensure the sound value never safely drops below 0 or goes above 1.0
//     calculatedVolume = Math.max(0.0, Math.min(1.0, calculatedVolume));
    
//     // Round to 2 decimal places for clean audio engine feeding
//     const finalVolumeValue = parseFloat(calculatedVolume.toFixed(2));

//     // 4. Generate the corresponding text string based on the sound profile
//     let textString;
//     if (finalVolumeValue === 0) {
//         textString = "Dry / Silent Atmosphere";
//     } else if (finalVolumeValue <= 0.15) {
//         textString = "Faint Background Drizzle";
//     } else if (finalVolumeValue <= 0.40) {
//         textString = "Moderate Soft Rain";
//     } else if (finalVolumeValue <= 0.75) {
//         textString = "Heavy Steady Downpour Sound";
//     } else {
//         textString = "Max Volume Torrential Storm Audio";
//     }

//     // Return both the numeric configuration and the text string
//     return {
//         volume: finalVolumeValue,
//         string: textString
//     };
// }

// // ==========================================
// // TEST EXAMPLES
// // ==========================================

// // Example A: Tiny drizzle over a wide area (Low numeric sound, soft string)
// console.log(getRainSoundSettings(0.5, 90, 80, 'metric')); 
// // Output: { volume: 0.01, string: 'Faint Background Drizzle' }

// // Example B: Moderate rain, highly certain (Medium sound mix)
// console.log(getRainSoundSettings(8.0, 100, 75, 'metric')); 
// // Output: { volume: 0.24, string: 'Moderate Soft Rain' }

// // Example C: Severe storm downpour (High volume factor near limits)
// console.log(getRainSoundSettings(22.0, 100, 100, 'metric')); 
// // Output: { volume: 0.88, string: 'Max Volume Torrential Storm Audio' }
