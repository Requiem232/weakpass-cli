# weakpass-cli
🎨 Interact with Weakpass.com's API through the terminal

## Getting Started
```bash
$ git clone https://github.com/ibnaleem/weakpass-cli
$ cd weakpass-cli
$ npx tsc
```
### Searching Hashes
```bash
$ node dist/index.js search <hash>
```
### Searching Ranges
```bash
$ node dist/index.js range <hash_range> <hash_type>
```
- `<hash_range>` is between 6 to 64 characters and each character is from the set `[a-f0-9]`
- `<hash_type>` can only be `md5`, `ntlm`, `sha1` and `sha256` (`sha256` is not allowed)

### Generating Passwords from a Rule
```bash
$ node dist/index.js generate <word> <rule>
```
Allowed rules:
- `online.rule`
- `top_3000.rule`
- `top_1500.rule`
- `top_750.rule`
- `top_500.rule`
- `top_250.rule`
- `nsa64.rule`
- `numbers.rule`
- `numbers100.rule`
- `years_1900_2025.rule`
- `years.rule`
- `symbols.rule`
# LICENSE
[GNU General Public License v3](https://github.com/ibnaleem/weakpass-cli/blob/main/LICENSE)
