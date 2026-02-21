import axios from 'axios';
import chalk from 'chalk';
import { Command } from 'commander';

function validHash(hash: string): boolean {
    const patterns = {
        // NTLM has the same
        // regex pattern as MD5
        // Hence why I omitted it
        md5: /^[0-9a-fA-F]{32}$/,
        sha1: /^[0-9a-fA-F]{40}$/,
        sha256: /^[0-9a-fA-F]{64}$/,
        sha512: /^[0-9a-fA-F]{128}$/ 
    };

    return patterns.md5.test(hash) || patterns.sha1.test(hash) || patterns.sha256.test(hash) || patterns.sha512.test(hash);
}

export function loadCommands(program: Command) {
    program.command('search <hash>')
    .description('Search NTLM, MD5, SHA1, SHA256 and SHA512 hashes on Weakpass.com')
    .action((hash: string) => {
        if (!validHash(hash)) {
            console.error(chalk.red(`Invalid hash format for ${hash} of length ${hash.length}.\nAllowed hashes: NTLM, MD5, SHA1, SHA256 and SHA512`));
            return;
        }
        console.log(chalk.yellow(`Searching for hash: ${hash}...`));

        const url = `https://weakpass.com/api/v1/search/${hash}.json`;

        const headers = {
            'accept': 'application/json',
        };

        axios.get(url, { headers })
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error(chalk.red(error));
            });
    });
}