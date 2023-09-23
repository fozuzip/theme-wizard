export const HowDoesItWork = () => {
  return (
    <div className="flex w-100gap-6">
      <div className="w-[30%]">
        <h1 className="text-4xl font-bold pb-6 "> How Does It Work</h1>
        <p>Click on any element to customize the elements colors</p>
      </div>
      <div className="flex flex-col w-[70%] gap-12">
        <div className="flex gap-12 pb-24">
          <div className="flex w-[50%] gap-4">
            <h1 className="text-4xl font-extrabold text-primary">1</h1>
            <p>
              Start with two neutral colors for the text and the background.
            </p>
          </div>
          <div className="flex w-[50%] gap-4">
            <h1 className="text-4xl font-extrabold text-primary">2</h1>
            <p>
              Choose your primary and secondary colors. Primary is for main CTAs
              and sections, and Secondary is for less important buttons and info
              cards.
            </p>
          </div>
        </div>
        <div className="flex gap-12">
          <div className="flex w-[50%] gap-4">
            <h1 className="text-4xl font-extrabold text-primary">3</h1>
            <p>
              Accent color is an additional color. It appears in images,
              highlights, hyperlinks, boxes, cards, etc.
            </p>
          </div>
          <div className="flex w-[50%] gap-4">
            <h1 className="text-4xl font-extrabold text-primary">4</h1>
            <p>
              Happy with the results? Press on “Export” and choose among
              different options to export in various formats, like .zip, .png,
              CSS, SCSS, QR Code, and more.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
