import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";

export default function Home() {
  return (
    <div className="p-5">
      <div className="flex flex-col gap-y-4">
        <div>
          <Button variant="elevated">I am a button</Button>
        </div>
        <div>
          <Input placeholder="I am input" />
        </div>
        <div>
          <Progress value={33} />
        </div>
        <div>
          <Textarea />
        </div>
      </div>
    </div>
  );
}
