import { LineType } from '../Utils/constants';
import type {
  ClassificationResult,
  LanguageParser,
  ParserContext,
} from '../Utils/type';

export class JavascriptParser implements LanguageParser {
  getSupportedExtensions(): string[] {
    return ['.js', '.jsx', '.ts', '.tsx'];
  }
  classifyLine(line: string, context?: ParserContext): ClassificationResult {
    const trimmedLine = line.trim();

    // Check for blank lines
    if (trimmedLine.length === 0) {
      return {
        type: LineType.WHITESPACE,
        context,
      };
    }

    // If we're inside a multi-line comment
    if (context?.isMultiLineComment) {
      // Check if this line ends the multi-line comment
      if (trimmedLine.includes('*/')) {
        return {
          type: LineType.MULTI_LINE_COMMENT,
          context: { isMultiLineComment: false },
        };
      }
      return {
        type: LineType.MULTI_LINE_COMMENT,
        context: { isMultiLineComment: true },
      };
    }

    if (trimmedLine.startsWith('/*')) {
      const commentEnd = trimmedLine.indexOf('*/', 2);
      
      if (commentEnd !== -1) {
        return {
          type: LineType.MULTI_LINE_COMMENT,
          context: { isMultiLineComment: false },
        };
      }
      return {
        type: LineType.MULTI_LINE_COMMENT,
        context: { isMultiLineComment: true },
      };
    }

    if (trimmedLine.startsWith('//')) {
      return {
        type: LineType.SINGLE_LINE_COMMENT,
        context: { isMultiLineComment: false },
      };
    }
    return {
      type: LineType.CODE,
      context: { isMultiLineComment: false },
    };
  }  

} 
 
