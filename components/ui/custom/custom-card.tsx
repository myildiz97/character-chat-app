"use client"

import { cn } from '@/lib/utils';
import { ComponentProps, forwardRef } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../card';
import { CustomHeading } from './custom-heading';
import { CustomText } from './custom-text';

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
        "w-full rounded-none sm:rounded-xl sm:max-w-sm mx-auto",
        className,
      )}
    >
      <CardHeader 
        className={cn(
          headerClassName,
        )}
      >
        <CardTitle className={cn(
          headerTitleClassName,
        )}>
          <CustomHeading variant='h1'>
            {title}
          </CustomHeading>
        </CardTitle>
        <CardDescription className={cn(
          headerDescriptionClassName,
        )}>
          <CustomText variant='p'>
            {description}
          </CustomText>
        </CardDescription>
      </CardHeader>
      <CardContent className={cn(contentClassName)}>
        {children}
      </CardContent>
      {footer && (
        <CardFooter className={cn(
          footerClassName,
        )}>
          <CustomText variant='span'>
            {footer}
          </CustomText>
        </CardFooter>
      )}
    </Card>
  )
})

CustomCard.displayName = 'CustomCard';

export { CustomCard };