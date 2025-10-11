// components/JsonLd.tsx
import React from "react";


// Strict JSON type that supports readonly arrays/objects
type JSONValue =
  | string
  | number
  | boolean
  | null
  | JSONObject
  | readonly JSONValue[];

interface JSONObject {
  readonly [key: string]: JSONValue;
}

export default function JsonLd({ data }: { data: JSONObject }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
