import { N3Serializer, XMLSerializer } from "./serializers";

/**
 *  ParserManager retrieves the correct parser for the format of RDF (Turtle, RDF/XML, ...)
 */
export class SerializerManager {
  static parse(doc, type) {
    switch (type) {
      // TODO: Add RDF/XML and other formats
      case "text/n3":
      case "text/turtle":
      case "application/nquads":
      case "application/n-quads":
        return N3Serializer.serialize(doc, type);
      case "application/ld+json":
        return doc;
      default:
        console.log("UNSUPPORTED FORMAT");
    }
  }
}
