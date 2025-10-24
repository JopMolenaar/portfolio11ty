const fs = require("fs");
const path = require("path");
const axios = require("axios");
const { marked } = require("marked");

function loadJSON(filename) {
    console.log("Get:", filename);
    if (fs.existsSync(filename)) {
        // Read file asynchronously and parse JSON data
        return new Promise((resolve, reject) => {
            fs.readFile(filename, (err, data) => {
                const jsonData = JSON.parse(data);
                resolve(jsonData); // Resolve with parsed JSON data
            });
        });
    } else {
        // File does not exist, return null or appropriate value
        return Promise.resolve(null);
    }
}

// Parse local Markdown file to HTML
const parseToHTML = (markdownFile) => {
    return new Promise((resolve, reject) => {
        fs.readFile(markdownFile, "utf8", (err, data) => {
            if (err) {
                console.error("Error reading file:", err);
                reject(err);
            } else {
                const html = marked(data);
                resolve(html);
            }
        });
    });
};

// Parse remote Markdown file to HTML
const parseHTTPmdToHTML = async (url) => {
    try {
        const response = await axios.get(url);
        const html = marked(response.data);
        return html;
    } catch (error) {
        console.error("Error fetching file:", error);
        throw error;
    }
};

// Export an asynchronous function to fetch project data
module.exports = async function () {
    try {
        const projectsFilePath = path.join(__dirname, "../projects/projects.json");
        const projects = await loadJSON(projectsFilePath);

        const markdownContents = []; // Array to store markdown content
        for (const item of projects) {
            let markdownContent;
            let descriptionContent = "";

            if (item.descLink) {
                if (!item.descLink.startsWith("http")) {
                    // Resolve the local path relative to the projects.json file
                    // console.log("LOCAL MD FILE", item.descLink);
                    const localMarkdownPath = path.resolve(path.dirname(projectsFilePath), `../projects/projectsDesc/${item.descLink}`);
                    try {
                        markdownContent = await parseToHTML(localMarkdownPath); // Parse local markdown file
                    } catch (err) {
                        console.error("Could not parse local markdown file:", localMarkdownPath, err);
                        markdownContent = "";
                    }
                    // console.log("MARKDOWNCONTENT", markdownContent);

                    // Try to strip <p> tags only if the entire content is wrapped in a single <p>
                    if (/^<p>[\s\S]*<\/p>$/.test(markdownContent.trim())) {
                        descriptionContent = markdownContent.trim().replace(/^<p>([\s\S]*)<\/p>$/, "$1");
                    } else {
                        descriptionContent = markdownContent.trim();
                    }
                } else {
                    markdownContent = await parseHTTPmdToHTML(item.descLink); // Parse markdown file from HTTP link
                }

                // Split the markdown content by the <h2> tags
                const sections = markdownContent.split(/<h2[^>]*>/);

                // Find the section with the "Description" header

                for (const section of sections) {
                    if (section.toLowerCase().includes("description")) {
                        // Get the content after the "Description" header
                        const startIndex = section.indexOf("</h2>") + 5; // End of the header tag
                        descriptionContent = section.substring(startIndex).trim();

                        // Remove <p></p> tags around the content
                        descriptionContent = descriptionContent.replace(/^<p>([\s\S]*)<\/p>$/, "$1");
                        break;
                    }
                }
            }
            let projectDescription = "";
            if (descriptionContent !== "") {
                projectDescription = descriptionContent;
                console.log("FETCHED description content:", descriptionContent);
            } else {
                projectDescription = item.littleDesc;
            }

            // Add the markdown content and project name to the array
            markdownContents.push({
                dataName: item.dataName,
                name: item.name,
                projectDescription: projectDescription, // Use "No content" if descriptionContent is empty
                linkToRepo: item.linkToRepo,
                linkToWebsite: item.linkToWebsite,
                images: item.images,
                usedSkills: item.usedSkills,
                grade: item.grade,
                date: item.date,
                img: item.img,
                imgAlt: item.imgAlt,
                littleDesc: projectDescription,
                prize: item.prize
            });
        }

        return {
            projects: markdownContents, // Assuming projects data is an array of objects
        };
    } catch (error) {
        console.error("Error fetching projects:", error);
        return {
            projects: [], // Return empty array in case of error
        };
    }
};
