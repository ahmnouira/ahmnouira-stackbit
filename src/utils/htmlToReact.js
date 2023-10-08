import HtmlToReact, { Parser as HtmlToReactParser } from "html-to-react";

export default function htmlToReact(html) {
  if (!html) {
    return null;
  }

  const isValidNode = function () {
    return true;
  };

  // Order matters. Instructions are processed in the order they're defined
  const processNodeDefinitions = new HtmlToReact.ProcessNodeDefinitions();
  const processingInstructions = [
    {
      // Custom <h1> processing
      shouldProcessNode: function (node) {
        return node.parent && node.parent.name && node.parent.name === "h1";
      },
      processNode: function (node, children) {
        return node.data.toUpperCase();
      },
    },
    {
      // Anything else
      shouldProcessNode: function (node) {
        return true;
      },
      processNode: processNodeDefinitions.processDefaultNode,
    },
  ];

  const htmlToReactParser = new HtmlToReactParser();

  return htmlToReactParser.parseWithInstructions(
    html,
    isValidNode,
    processingInstructions
  );
}
