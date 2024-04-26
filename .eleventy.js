module.exports = function (eleventyConfig) {
    // Set input and output directories
    return {
        dir: {
            input: "src",
            output: "public",
            includes: "_includes", // Specify the directory for includes (partials)
        },
        markdownTemplateEngine: "ejs", // Use EJS for Markdown files
        htmlTemplateEngine: "ejs", // Use EJS for HTML files as well
        passthroughFileCopy: true, // Copy files that Eleventy doesn't process (like assets)
    };
};
