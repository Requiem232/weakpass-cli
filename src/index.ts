#!/usr/bin/env node
import { Command } from 'commander';

const program = new Command();

program.name('weakpass-cli')
.description("🎨 Interact with Weakpass.com's API through the terminal")
.version('1.0.0');

program.parse(process.argv);