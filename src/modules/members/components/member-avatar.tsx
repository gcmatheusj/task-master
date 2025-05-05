import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

interface MemberAvatarProps {
  name: string
  image?: string
  className?: string
  fallbackClassName?: string
}

export function MemberAvatar({ 
  className,
  fallbackClassName,
  image,
  name
}: MemberAvatarProps) {
  return (
    <Avatar className={cn('size-5 border border-neutral-300 rounded-none', className)}>
      <AvatarImage src={image} alt={name} />
      <AvatarFallback
        className={
          cn(
            'bg-neutral-200 font-medium text-neutral-500 flex items-center justify-center rounded-none', 
            fallbackClassName
          )}
      >
        {name.charAt(0).toUpperCase()}
      </AvatarFallback>
    </Avatar>
  )
}