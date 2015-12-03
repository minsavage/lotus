//
//  PendulumView.m
//  DreamCloud
//
//  Created by 张玉龙 on 15/11/14.
//  Copyright © 2015年 soundario. All rights reserved.
//

#import "PendulumView.h"

@implementation PendulumView

- (void)setImage:(UIImage *)image
{
    [super setImage:[self getImageWithoutScale:image size:self.frame.size backColor:[UIColor clearColor]]];
}

- (void)startPendulumAnimation
{
    _isPlayAnimation = YES;
    CABasicAnimation *momAnimation = [CABasicAnimation animationWithKeyPath:@"transform.rotation.z"];
    momAnimation.fromValue = @(-0.5f);
    momAnimation.toValue = @(0.5f);
    momAnimation.duration = 2;
    momAnimation.repeatCount = CGFLOAT_MAX;
    momAnimation.autoreverses = YES;
    [self.layer addAnimation:momAnimation forKey:@"animation"];
}

- (void)stopPendulumAnimation
{
    _isPlayAnimation = NO;
    [self.layer removeAllAnimations];
}

// 裁剪图片
- (UIImage *)getImageWithoutScale:(UIImage *)image size:(CGSize)asize backColor:(UIColor *)color
{
    UIImage *newimage;
    if (nil == image) {
        newimage = nil;
    }
    else{
        CGSize oldsize = image.size;
        CGSize newSize = CGSizeMake(asize.width, asize.height / 2.0);
        CGRect rect;
        // 根据新旧宽高比来处理图片按比例缩放
        if (newSize.width/newSize.height > oldsize.width/oldsize.height) {
            rect.size.width = newSize.height*oldsize.width/oldsize.height;
            rect.size.height = newSize.height;
            rect.origin.x = (newSize.width - rect.size.width)/2;
            rect.origin.y = newSize.height;
        } else {
            rect.size.width = newSize.width;
            rect.size.height = newSize.width*oldsize.height/oldsize.width;
            rect.origin.x = 0;
            rect.origin.y = newSize.height;
        }
        // 重新绘制图片
        UIGraphicsBeginImageContext(asize);
        CGContextRef context = UIGraphicsGetCurrentContext();
        CGContextSetFillColorWithColor(context, [color CGColor]);
        UIRectFill(CGRectMake(0, 0, asize.width, asize.height));//clear background
        [image drawInRect:rect];
        newimage = UIGraphicsGetImageFromCurrentImageContext();
        UIGraphicsEndImageContext();
    }
    image = nil;
    return newimage;
}

@end
