import * as core from '@actions/core';
import * as fs from 'fs';
import * as path from 'path';

async function run() {
    try{
        const requiredFile = core.getInput('requiredFile');
        const filePath = path.join(process.cwd(), requiredFile);

        if(!fs.existsSync(filePath)){
            core.setFailed(`O arquivo "${requiredFile}" não foi encontrado, abortar a pipeline`);
            return;
        }
        core.info(`O arquivo "${requiredFile}" foi encontado, prosseguindo com a pipeline`);
    } catch (error: any){
      core.setFailed(error.message);  
    }
    
}

run();
