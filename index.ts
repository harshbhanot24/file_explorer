import * as FileSystem from 'fs';
import path, * as Path from 'path';
import ParserFactory from './parserFactory';
import FileProcessor from './Processor/FileProcessor';
import { LineType } from './Utils/constants';

function main() {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.log('No arguments provided.');
    process.exit(1);
  }

  const filePath = path.resolve(args[0]);

  if (!FileSystem.existsSync(filePath)) {
    console.error(`Error: File not found: ${filePath}`);
    process.exit(1);
  }

  const fileExtension = path.extname(filePath).toLowerCase();
  console.log(`File: ${filePath}`);
  console.log(`Extension: ${fileExtension}`);

  try {
    const parser = ParserFactory.getParser(fileExtension);
    console.log(`Using parser that supports: ${parser.getSupportedExtensions().join(', ')}`);
    
    // Process the file
    const processor = new FileProcessor();
    const result = processor.processFile(filePath, parser);
    
    // Display results
    processor.displayDetailedResults(result, [LineType.CODE, LineType.SINGLE_LINE_COMMENT, LineType.MULTI_LINE_COMMENT]);
    processor.displaySummary(result);
    
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error: ${error.message}`);
      console.log(`\nSupported extensions: ${ParserFactory.getSupportedExtensions().join(', ')}`);
    }
    process.exit(1);
  }
}
main();