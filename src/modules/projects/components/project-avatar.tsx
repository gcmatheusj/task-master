import Image from "next/image";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface ProjectAvatarProps {
  image?: string;
  name: string;
  className?: string;
  fallbackClassName?: string;
}

export function ProjectAvatar ({
  image,
  name,
  className,
  fallbackClassName
}: ProjectAvatarProps) {
  if (image) {
    return (
      <div className={cn('size-6 relative rounded-none overflow-hidden', className)}>
        <Image src={image} alt={name} fill className="aspect-square" />
      </div>
    )
  }

  return (
    <Avatar className={cn('size-6 rounded-none', className)}>
      <AvatarFallback className={cn('text-white bg-yellow-500 font-semibold text-md uppercase rounded-none', fallbackClassName)}>
        {name[0]}
      </AvatarFallback>
    </Avatar>
  )
}