import fs from 'fs';
import axios from 'axios';
import chalk from 'chalk';
import { Command } from 'commander';

enum Rules {
    Online = "online.rule",
    Top3000 = "top_3000.rule",
    Top1500 = "top_1500.rule",
    Top750 = "top_750.rule",
    Top500 = "top_500.rule",
    Top250 = "top_250.rule",
    NSA64 = "nsa64.rule",
    Numbers = "numbers.rule",
    Numbers100 = "numbers100.rule",
    Years1900to2025 = "years_1900_2025.rule",
    Years = "years.rule",
    Symbols = "symbols.rule"
}

export function generateCommand(program: Command){
    program.command('generate <word> <rule>') 
    .description('Generate a wordlist for specific string based on certain hashcat rule set\nAllowed rules: online.rule, top_3000.rule, top_1500.rule, top_750.rule, top_500.rule, top_250.rule, nsa64.rule, numbers.rule, numbers100.rule, years_1900_2025.rule, years.rule, symbols.rule') 
    .action((word: string, rule: Rules) => {
            console.log(chalk.yellow(`[*] Generating wordlist for string: "${word}" with rule: ${rule}...`));

            const url = `https://weakpass.com/api/v1/generate/${word}?set=${rule}&type=txt'`

            const headers = {
                'accept': 'text/plain',
            };

            axios.get(url, { headers })
            .then(response => {
                const passwords = response.data;
                const numberOfPasswords = passwords.length;
                const top10Passwords = passwords.slice(0, 10);

                console.log(chalk.green(`[+] Generated ${numberOfPasswords} passwords with rule ${rule}!`))
                console.log(chalk.green('[+] Top 10 passwords:'))
                top10Passwords.forEach((password: string, index: number) => {
                    console.log(chalk.blue(` ↳ [+] ${index + 1}: ${password}`));
                  });

                console.log(chalk.yellow(`[*] Writing all ${numberOfPasswords} to ${word}_${rule}.txt...`))

                fs.writeFile(`${word}_${rule}.txt`, passwords.join('\n'), (err) => {
                    if (err) {
                      console.error(chalk.red('Error writing file:', err));
                    } else {
                      console.log(chalk.green(`[*] All hashes written to ${word}_${rule}.txt!`));
                    }
                  });
            })
            .catch(error => {
                console.error(chalk.red(error));
            });
            
        });
}