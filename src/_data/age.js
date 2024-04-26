const birthDate = "2004-05-31";

// Function to calculate age based on birthdate
function calculateAge(birthDate) {
    const birthDay = new Date(birthDate);
    const today = new Date();

    let age = today.getFullYear() - birthDay.getFullYear();
    const monthDiff = today.getMonth() - birthDay.getMonth();

    // Adjust age based on month and day of birth
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDay.getDate())) {
        age--;
    }

    return age;
}

// Export an asynchronous function to fetch project data
module.exports = async function () {
    try {
        const age = calculateAge(birthDate);

        // Return an object containing both project data and age
        return {
            // projects: projects, // Assuming projects data is an array of objects
            age: age, // Include the calculated age in the returned data
        };
    } catch (error) {
        console.error("Error fetching projects:", error);
        return {
            // projects: [], // Return empty array in case of error
            age: 19, // Default age value if calculation fails
        };
    }
};
