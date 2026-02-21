#!/usr/bin/env node
import { Command } from 'commander';
import { searchCommand } from './commands/search';
import { rangeCommand } from './commands/range';
import { generateCommand } from './commands/generate';

const program = new Command();

program.name('weakpass-cli')
.description("🎨 Interact with Weakpass.com's API through the terminal")
.version('1.0.0');

searchCommand(program);
rangeCommand(program);
generateCommand(program);
program.parse(process.argv);