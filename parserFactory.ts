import { LanguageParser } from './Utils/type';
import { JavascriptParser } from './Parsers/JavascriptParser';
import { JavaParser } from './Parsers/JavaParser';

class ParserFactory {
  private static parsers: LanguageParser[] = [
    new JavascriptParser(),
    new JavaParser(),
    // Add more parsers here as needed
  ];

  public static getParser(extension: string): LanguageParser {
    // Ensure extension starts with a dot
    const ext = extension.startsWith('.') ? extension : `.${extension}`;
    
    for (const parser of this.parsers) {
      if (parser.getSupportedExtensions().includes(ext)) {
        return parser;
      }
    }
    
    throw new Error(`No parser found for extension: ${extension}`);
  }

  public static getSupportedExtensions(): string[] {
    return this.parsers.flatMap(parser => parser.getSupportedExtensions());
  }
}

export default ParserFactory;
