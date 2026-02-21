#!/usr/bin/env node
import { Command } from 'commander';
import { searchCommand } from './commands/search';
import { rangeCommand } from './commands/range';

const program = new Command();

program.name('weakpass-cli')
.description("🎨 Interact with Weakpass.com's API through the terminal")
.version('1.0.0');

searchCommand(program);
rangeCommand(program);
program.parse(process.argv);