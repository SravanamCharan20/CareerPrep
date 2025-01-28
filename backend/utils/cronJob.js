import { fileURLToPath } from 'url';
import path from 'path';
import { exec } from 'child_process';
import cron from 'node-cron';  

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const scriptPath = path.join(__dirname, '../python_scripts/hackathonScraper.py');
const scriptMLPath = path.join(__dirname, '../python_scripts/mlProjectsscrap.py');

const runPythonScript = () => {
    console.log('Starting the Python script...');
    exec(`python3 ${scriptPath}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Exec error: ${error}`);
            return;
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
    });
};
const runPythonMLScript = () => {
    console.log('Starting the Python script...');
    exec(`python3 ${scriptMLPath}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Exec error: ${error}`);
            return;
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
    });
};

// console.log('Testing Python script execution without cron...');
// runPythonScript();

const cronJob = () => {
    cron.schedule('0 0 * * *', () => {
        console.log('Running Python script to fetch hackathons...');
        runPythonScript();
        runPythonMLScript();
    });
};

export default cronJob;