import { Upload } from 'lucide-react';

export function CreateCoursePage() {
    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Create New Course</h1>
                <p className="text-muted-foreground">Share your knowledge with the world.</p>
            </div>

            <form className="space-y-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium">Course Title</label>
                    <input
                        type="text"
                        className="w-full h-10 px-3 rounded-md border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                        placeholder="e.g. Advanced React Patterns"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Description</label>
                    <textarea
                        className="w-full min-h-[120px] px-3 py-2 rounded-md border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                        placeholder="What will students learn in this course?"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Price ($)</label>
                        <input
                            type="number"
                            className="w-full h-10 px-3 rounded-md border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                            placeholder="0.00"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Category</label>
                        <select className="w-full h-10 px-3 rounded-md border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                            <option>Development</option>
                            <option>Design</option>
                            <option>Business</option>
                            <option>Marketing</option>
                        </select>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Course Thumbnail</label>
                    <div className="border-2 border-dashed rounded-lg p-8 text-center hover:bg-muted/50 transition-colors cursor-pointer">
                        <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground">Drag and drop or click to upload</p>
                    </div>
                </div>

                <div className="pt-4 flex justify-end space-x-4">
                    <button type="button" className="px-4 py-2 rounded-md hover:bg-muted transition-colors">
                        Cancel
                    </button>
                    <button type="submit" className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
                        Publish Course
                    </button>
                </div>
            </form>
        </div>
    );
}
