import { defineConfig } from "vite";

export default defineConfig({
    build: {
        lib: {
            entry: {
                client: "src/my-dropdown-editor.element.ts",
                keyvaluelist: "src/key-value-list-editor.element.ts",
                keyvaluetags: "src/key-value-tags-editor.element.ts",
                toggletextlist: "src/toggle-text-list-editor.element.ts"
            },
            formats: ["es"],
        },
        outDir: "../../wwwroot/App_Plugins/Client",
        emptyOutDir: true,
        sourcemap: true,
        rollupOptions: {
            external: [/^@umbraco/],
        },
    },
    base: "/App_Plugins/Client/",
});