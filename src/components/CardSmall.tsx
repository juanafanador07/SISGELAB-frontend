import { Icon } from "@iconify/react";
import { ReactNode } from "react";

import { Card, CardContent } from "@/components/ui/card";

interface CardSmall {
  title: string;
  icon?: string;
  description?: string;
  slotAction?: ReactNode;
}

export default function CardSmall({
  title,
  description,
  slotAction,
  icon = "material-symbols:book-2-outline-rounded",
}: CardSmall) {
  return (
    <Card className="py-4">
      <CardContent className="flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Icon icon={icon} className="size-10 text-red-500" />

          <span className="inline-flex flex-col gap-x-4 sm:flex-row sm:items-center">
            <h3 className="text-lg font-bold">{title}</h3>
            {description}
          </span>
        </div>
        {slotAction}
      </CardContent>
    </Card>
  );
}
