import { appSchema, tableSchema } from "@nozbe/watermelondb";

export default appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: "measurements",
      columns: [
        { name: "measurement_id", type: "string" },
        { name: "name", type: "string" },
        { name: "total_sqft", type: "number" },
        { name: "date", type: "string" },
      ],
    }),
    tableSchema({
      name: "measurement_info",
      columns: [
        { name: "measurement_id", type: "string", isIndexed: true },
        { name: "name", type: "string" },
        { name: "contact_info", type: "string" },
        { name: "areas", type: "string" },
        { name: "notes", type: "string" },
      ],
    }),
  ],
});
