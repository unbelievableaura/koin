import { NeoSidebar } from "@/components/ui/NeoSidebar";

export default function DocsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col md:flex-row min-h-screen">
            <NeoSidebar />
            <main className="flex-1 p-8 md:p-12 max-w-4xl">
                {children}
            </main>
        </div>
    );
}
