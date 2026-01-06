import { LineType } from '../Utils/constants';
import type {
  ClassificationResult,
  LanguageParser,
  ParserContext,
} from '../Utils/type';

export class JavaParser implements LanguageParser {
  getSupportedExtensions(): string[] {
    return ['.java'];
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
      // Still inside the multi-line comment
      return {
        type: LineType.MULTI_LINE_COMMENT,
        context: { isMultiLineComment: true },
      };
    }

    // Check if this line starts a multi-line comment (including Javadoc /** */)
    if (trimmedLine.startsWith('/*')) {
      // Check if it also ends on the same line
      const commentEnd = trimmedLine.indexOf('*/', 2);

      if (commentEnd !== -1) {
        // Multi-line comment starts and ends on the same line
        return {
          type: LineType.MULTI_LINE_COMMENT,
          context: { isMultiLineComment: false },
        };
      }
      // Multi-line comment starts but doesn't end
      return {
        type: LineType.MULTI_LINE_COMMENT,
        context: { isMultiLineComment: true },
      };
    }

    // Single-line comment
    if (trimmedLine.startsWith('//')) {
      return {
        type: LineType.SINGLE_LINE_COMMENT,
        context: { isMultiLineComment: false },
      };
    }

    // Regular code
    return {
      type: LineType.CODE,
      context: { isMultiLineComment: false },
    };
  }
}
