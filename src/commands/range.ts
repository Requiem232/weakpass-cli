import fs from 'fs';
import axios from 'axios';
import chalk from 'chalk';
import { Command } from 'commander';

enum HashTypes {
    MD5 = "md5",
    SHA1 = "sha1",
    NTLM = "ntlm",
    SHA256 = "sha256"
}


function validRangeHash(hash: string): boolean {
    return /^[0-9a-fA-F]{6,64}$/.test(hash);
}

export function rangeCommand(program: Command) {
    program.command('range <hash> <type>')
    .description('Retrieve a list of hash-password pairs based on a specific prefix. Currently, all_in_one wordlist is used as the precomputed list for md5 and ntlm, and weakpass_4a for sha1 and sha256')
    .action((hash: string, hash_type: HashTypes) => {
        if (!validRangeHash(hash)) {
            console.error(chalk.red(`Invalid hash range for ${hash} of length ${hash.length}.\nAllowed hashes: NTLM, MD5, SHA1, SHA256\nAllowed ranges: between 6 and 64`));
            return;
        }

        if (!Object.values(HashTypes).includes(hash_type)) {
            console.error(chalk.red(`Invalid hash type: ${hash_type}. Allowed values: ${Object.values(HashTypes).join(", ")}`));
            return;
        }    

        console.log(chalk.yellow(`[*] Searching for hash range ${hash} with hash type ${hash_type}...`));

        const url = `https://weakpass.com/api/v1/range/${hash}.txt?type=${hash_type}`;

        const headers = {
            'accept': 'text/plain',
        };

        axios.get(url, { headers })
            .then(response => {
                const hashes = response.data.split('\n');
                const numberOfHashes = hashes.length;
                const top10Hashes = response.data.split('\n').slice(0, 10);

                console.log(chalk.green(`[+] Found ${numberOfHashes} hash-plain pairs!`))
                console.log(chalk.green('[+] Top 10 hash-plain pairs:'))
                top10Hashes.forEach((hash: string, index: number) => {
                    console.log(chalk.blue(` ↳ [+] ${index + 1}: ${hash}`));
                  });

                console.log(chalk.yellow(`[*] Writing all ${numberOfHashes} to ${hash}.txt...`))

                fs.writeFile(`${hash}.txt`, hashes.join('\n'), (err) => {
                    if (err) {
                      console.error(chalk.red('Error writing file:', err));
                    } else {
                      console.log(chalk.green(`[*] All hashes written to ${hash}.txt!`));
                    }
                  });
            })
            .catch(error => {
                console.error(chalk.red(error));
            });
    });
}