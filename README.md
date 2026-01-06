# File Parser

A TypeScript-based code analysis tool that parses source code files and provides detailed line-by-line classification statistics. It identifies code, comments (single-line and multi-line), and whitespace across multiple programming languages.

## Features

- 🔍 **Multi-language Support**: JavaScript, TypeScript, Java (easily extensible)
- 📊 **Detailed Analysis**: Distinguishes between code, single-line comments, multi-line comments, and whitespace
- 🏗️ **Extensible Architecture**: Plugin-based parser system using factory pattern
- 🧪 **Well Tested**: Comprehensive test coverage with Jest
- 🎯 **Context-aware Parsing**: Properly handles multi-line comment blocks

## Installation

```bash
# Clone the repository
git clone <repository-url>
cd file_explorer

# Install dependencies
npm install

# Build the project
npm run build
```

## Usage

### Analyze a File

```bash
npm run start <file-path>
```

### Examples

Analyze a TypeScript file:
```bash
npm run start Parsers/JavascriptParser.ts
```

Analyze a Java file:
```bash
npm run start Example.java
```

### Output

The tool provides:
1. **Detailed Classification**: Shows all lines classified as multi-line comments
2. **Summary Statistics**: Count of each line type

```
File: /path/to/file.ts
Extension: .ts
Using parser that supports: .js, .jsx, .ts, .tsx

Detailed Line Classification:
  73: [MULTI_LINE_COMMENT] /*
  74: [MULTI_LINE_COMMENT]   This is a multi-line comment.
  ...

Line Count Summary:
──────────────────────────────
CODE                : 55
WHITESPACE          : 11
SINGLE_LINE_COMMENT : 10
MULTI_LINE_COMMENT  : 6
──────────────────────────────
TOTAL               : 82
```

## Supported Languages

| Language | Extensions | Comment Styles |
|----------|-----------|----------------|
| JavaScript/TypeScript | `.js`, `.jsx`, `.ts`, `.tsx` | `//` and `/* */` |
| Java | `.java` | `//` and `/* */`, `/** */` (Javadoc) |

## Project Structure

```
file_explorer/
├── Parsers/
│   ├── JavascriptParser.ts    # Parser for JS/TS files
│   └── JavaParser.ts           # Parser for Java files
├── __tests__/
│   └── JavascriptParser.test.ts  # Test suite
├── constants.ts                # Line type enums
├── type.ts                     # TypeScript interfaces
├── parserFactory.ts            # Parser factory
├── FileProcessor.ts            # File processing service
├── index.ts                    # Entry point
├── package.json
├── tsconfig.json
└── jest.config.js
```

## Development

### Run in Development Mode

```bash
npm run dev <file-path>
```

### Run Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Build

```bash
npm run build
```

## Extending with New Languages

Adding support for a new language is simple:

### 1. Create a New Parser

Create a new file in `Parsers/` directory (e.g., `PythonParser.ts`):

```typescript
import { LineType } from '../constants';
import type { ClassificationResult, LanguageParser, ParserContext } from '../type';

export class PythonParser implements LanguageParser {
  getSupportedExtensions(): string[] {
    return ['.py'];
  }

  classifyLine(line: string, context?: ParserContext): ClassificationResult {
    const trimmedLine = line.trim();
    
    // Implement Python-specific parsing logic
    // Handle # comments, ''' ''' multi-line strings, etc.
    
    return {
      type: LineType.CODE,
      context: { isMultiLineComment: false },
    };
  }
}
```

### 2. Register in Factory

Update `parserFactory.ts`:

```typescript
import { PythonParser } from './Parsers/PythonParser';

class ParserFactory {
  private static parsers: LanguageParser[] = [
    new JavascriptParser(),
    new JavaParser(),
    new PythonParser(),  // Add your parser here
  ];
  // ...
}
```

That's it! The factory will automatically discover and use your parser for `.py` files.




## Testing

Run tests with:
```bash
npm test
```

