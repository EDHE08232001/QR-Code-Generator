// Import the inquirer package for interactive command line user interfaces.
import inquirer from "inquirer";

// Import the qr-image package for generating QR codes.
import qr from "qr-image";

// Import the fs (File System) module to work with the file system on your computer.
import fs from "fs";

// Use inquirer to prompt the user for input.
inquirer
    .prompt([
        // Define a question object to get the URL from the user.
        { "message": "Type in your URL: ", "name": "URL" }
    ])
    .then((answers) => {
        // Extract the URL provided by the user from the answers object.
        const url = answers.URL;

        // Generate a QR code image from the URL.
        var qr_svg = qr.image(url);

        // Pipe the QR code stream to a file, creating a PNG image.
        qr_svg.pipe(fs.createWriteStream('qr_img.png'));
    })
    .catch((error) => {
        // Error handling for issues related to the inquirer prompt.
        if (error.isTtyError) {
            // This error is thrown if the prompt couldn't be rendered in the current environment.
            console.error("Prompt couldn't be rendered in the current environment");
        } else {
            // Handle any other errors.
            console.error("An error occurred: ", error);
        }
    });
