"use client"

import { cn } from '@/lib/utils';
import { ComponentProps, forwardRef } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../card';

interface CustomCardProps extends ComponentProps<"div"> {
  title: string;
  description: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  headerClassName?: string;
  headerTitleClassName?: string;
  headerDescriptionClassName?: string;
  contentClassName?: string;
  footerClassName?: string;
}

const CustomCard = forwardRef<HTMLDivElement, CustomCardProps>(({ className, title, description, children, footer, headerClassName, headerTitleClassName, headerDescriptionClassName, contentClassName, footerClassName, ...props }, ref) => {
  return (
    <Card 
      ref={ref}
      {...props}
      className={cn(
        "w-full max-w-[98%] md:max-w-md mx-auto",
        className,
      )}
    >
      <CardHeader 
        className={cn(
          headerClassName,
        )}
      >
        <CardTitle className={cn(
          "text-4xl font-bold",
          headerTitleClassName,
        )}>
          {title}
        </CardTitle>
        <CardDescription className={cn(
          "text-lg",
          headerDescriptionClassName,
        )}>
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className={cn(contentClassName)}>
        {children}
      </CardContent>
      {footer && (
        <CardFooter className={cn(
          "text-muted-foreground text-center",
          footerClassName,
        )}>
          {footer}
        </CardFooter>
      )}
    </Card>
  )
})

CustomCard.displayName = 'CustomCard';

export { CustomCard };