import { CardWithForm } from "./components/card-example";
import ColorPickers from "./components/color-pickers";

export default function Home() {
  return (
    <div className="flex h-full justify-center items-center bg-background">
      <div className="flex flex-col space-y-4 items-center">
        <div className="py-4">
          <CardWithForm />
        </div>
        {/* <ColorPickers /> */}
      </div>
    </div>
  );
}
