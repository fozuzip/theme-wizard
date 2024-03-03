import { ColorPicker } from "@/components/color-picker";
import { Badge } from "@/components/ui/badge";

export const Features = () => {
  return (
    <section id="features" className="pt-32">
      <div className="flex justify-center">
        <Badge>Features</Badge>
      </div>
      <div className="flex justify-center text-center py-12">
        <h1 className="text-6xl font-bold tracking-tight">
          Explore Theme Wizard&apos;s
          <br />
          <span className="bg-gradient-to-r from-primary to-destructive bg-clip-text text-transparent ">
            Versatile Toolkit
          </span>
        </h1>
      </div>

      <div className="space-y-6">
        <div className="flex justify-center items-stretch gap-6">
          <div className="w-full border bg-card rounded-md p-6">
            <div className="flex items-center  pb-4">
              <h1 className="text-xl p-2 border rounded-md mr-3">🎨</h1>
              <h2 className="font-semibold text-lg">
                Effortless Color Customization
              </h2>
            </div>

            <p className="text-muted-foreground text-sm leading-5">
              Choose and tweak colors with ease, using the color picker,
              eyedropper, hex input, or suggested colors.
            </p>
          </div>
          <div className="w-full   border bg-card rounded-md p-6">
            <div className="flex items-center  pb-4">
              <h1 className="text-xl p-2 border rounded-md mr-3">🌈</h1>
              <h2 className="font-semibold text-lg">
                Color Scheme Randomization
              </h2>
            </div>

            <p className="text-muted-foreground text-sm leading-5">
              Instantly generate fresh color palettes based on your preferences
              and experiment with new looks effortlessly.
            </p>
          </div>
          <div className="w-full   border bg-card rounded-md p-6">
            <div className="flex items-center  pb-4">
              <h1 className="text-xl p-2 border rounded-md mr-3">🌗</h1>
              <h2 className="font-semibold text-lg">
                Intuitive Mode Switching
              </h2>
            </div>

            <p className="text-muted-foreground text-sm leading-5">
              Toggle between light and dark modes seamlessly to find the perfect
              visual style for your app.
            </p>
          </div>
        </div>
        <div className="flex items-strech justify-center gap-6">
          <div className="w-full  border bg-card rounded-md p-6">
            <div className="flex items-center  pb-4">
              <h1 className="text-xl p-2 border rounded-md mr-3">⏪</h1>
              <h2 className="font-semibold text-lg">Undo and Redo</h2>
            </div>

            <p className="text-muted-foreground text-sm leading-5">
              Maintain complete control over your design by easily reverting to
              previous states or comparing changes.
            </p>
          </div>

          <div className="w-full  border bg-card rounded-md p-6">
            <div className="flex items-center  pb-4">
              <h1 className="text-xl p-2 border rounded-md mr-3">🖌️</h1>
              <h2 className="font-semibold text-lg">
                Element-Specific Color Adjustment
              </h2>
            </div>

            <p className="text-muted-foreground text-sm leading-5">
              Fine-tune colors for specific elements by simply clicking on them,
              revealing their distinct color options.
            </p>
          </div>
          <div className="w-full  border bg-card rounded-md p-6">
            <div className="flex items-center  pb-4">
              <h1 className="text-xl p-2 border rounded-md mr-3">🔒</h1>
              <h2 className="font-semibold text-lg">Color Locking</h2>
            </div>

            <p className="text-muted-foreground text-sm leading-5">
              Lock colors you like and randomize the rest.
            </p>
          </div>
        </div>
        <div className="flex items-strech justify-center gap-6">
          <div className="w-full  border bg-card rounded-md p-6">
            <div className="flex items-center  pb-4">
              <h1 className="text-xl p-2 border rounded-md mr-3">🔤</h1>
              <h2 className="font-semibold text-lg">Advanced Font Selection</h2>
            </div>

            <p className="text-muted-foreground text-sm leading-5">
              Tailor your typography with Google Fonts, and get inspired with a
              click of the Random button.
            </p>
          </div>
          <div className="w-full  border bg-card rounded-md p-6">
            <div className="flex items-center  pb-4">
              <h1 className="text-xl p-2 border rounded-md mr-3">🔲</h1>
              <h2 className="font-semibold text-lg">
                Border Radius Customization
              </h2>
            </div>

            <p className="text-muted-foreground text-sm leading-5">
              Achieve the perfect element shape by adjusting the border radius
              to your liking.
            </p>
          </div>
          <div className="w-full  border bg-card rounded-md p-6">
            <div className="flex items-center  pb-4">
              <h1 className="text-xl p-2 border rounded-md mr-3">🚀</h1>
              <h2 className="font-semibold text-lg">Effortless Export</h2>
            </div>

            <p className="text-muted-foreground text-sm leading-5">
              When your theme is ready, export the CSS with a single click and
              seamlessly integrate it into your project, making customization a
              breeze.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
