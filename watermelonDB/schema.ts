import { appSchema, tableSchema } from "@nozbe/watermelondb";

export default appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: "measurements",
      columns: [
        { name: "name", type: "string" },
        { name: "total_sqft", type: "number" },
        { name: "date", type: "number" },
        { name: "contact_info", type: "string" },
        { name: "areas", type: "string" },
        { name: "notes", type: "string" },
        { name: "imperial", type: "boolean" },
      ],
    }),
  ],
});
