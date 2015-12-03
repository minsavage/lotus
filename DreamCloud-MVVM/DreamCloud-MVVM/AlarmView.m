//
//  AlarmView.m
//  DreamCloud
//
//  Created by 张玉龙 on 15/11/14.
//  Copyright © 2015年 soundario. All rights reserved.
//

#import "AlarmView.h"
#import "DCUtil.h"
//#import "UserConfigMgr.h"

@implementation AlarmView
{
    UILabel *timeLabel;
    UIButton *onOffBtn;
    CGPoint oldCenter;
    
    CGFloat vh;
    CGFloat vw;
    CGFloat lw;
    
}

- (id)initWithFrame:(CGRect)frame
{
    self = [super initWithFrame:frame];
    if (self) {
        
        [self initSubViews];
    }
    return self;
}

- (void)setFrame:(CGRect)frame
{
    [super setFrame:frame];
    [self initSubViews];
    [self setNeedsDisplay];
}

- (void)initSubViews
{
    vh = self.frame.size.height;
    vw = self.frame.size.width;
    lw = vh/10.0;
    
    if (timeLabel) {
        [timeLabel removeFromSuperview];
    }
    UILabel *label = [[UILabel alloc] initWithFrame:CGRectMake(lw, lw, vw - 2*lw, vh - 2*lw)];
    label.backgroundColor = [UIColor colorWithRed:0/255.0 green:47/255.0 blue:108/255.0 alpha:0];
    label.textColor = [UIColor whiteColor];
    label.textAlignment = NSTextAlignmentCenter;
    label.layer.masksToBounds = YES;
    label.layer.cornerRadius = label.frame.size.height/2.0;
    label.text = @"自然唤醒";
    CGFloat size = [[UIDevice currentDevice] userInterfaceIdiom]==UIUserInterfaceIdiomPad?24:15;
    label.font = [UIFont boldSystemFontOfSize:size];
    [self addSubview:label];
    timeLabel = label;
    
    timeLabel.userInteractionEnabled = YES;
    UITapGestureRecognizer *simpleTap = [[UITapGestureRecognizer alloc] initWithTarget:self action:@selector(simpleAction:)];
    simpleTap.numberOfTapsRequired = 1;
    [timeLabel addGestureRecognizer:simpleTap];
    
    if (onOffBtn) {
        [onOffBtn removeFromSuperview];
    }
    onOffBtn = [UIButton buttonWithType:UIButtonTypeCustom];
    onOffBtn.frame = CGRectMake(lw, lw, vh - 2*lw, vh - 2*lw);
    onOffBtn.backgroundColor = [UIColor whiteColor];
    onOffBtn.layer.masksToBounds = YES;
    onOffBtn.layer.cornerRadius = onOffBtn.frame.size.height/2.0;
    onOffBtn.center = CGPointMake(vh/2.0, vh/2.0);
    onOffBtn.userInteractionEnabled = NO;
    [self addSubview:onOffBtn];
    
}

- (void)simpleAction:(UITapGestureRecognizer *)recognizer
{
    if (_isOpen) {
        if (_delegate && [_delegate respondsToSelector:@selector(alarmViewSetCLock:)]) {
            [_delegate alarmViewSetCLock:self];
        }
    }
}

- (void)touchesBegan:(NSSet<UITouch *> *)touches withEvent:(UIEvent *)event
{
    UITouch *touch = [touches anyObject];
    CGPoint tPoint = [touch locationInView:self];
    if (tPoint.x > onOffBtn.frame.origin.x && tPoint.x < onOffBtn.frame.origin.x + onOffBtn.frame.size.width && tPoint.y > onOffBtn.frame.origin.y && tPoint.y < onOffBtn.frame.origin.y + onOffBtn.frame.size.height) {
        onOffBtn.selected = YES;
        oldCenter = onOffBtn.center;
    }
}


- (void)touchesMoved:(NSSet<UITouch *> *)touches withEvent:(UIEvent *)event
{
    if (onOffBtn.selected) {
        UITouch *touch = [touches anyObject];
        CGPoint tPoint = [touch locationInView:self];
        CGPoint center = onOffBtn.center;
        if (tPoint.x > 0 && tPoint.x < self.frame.size.width) {
            CGFloat xx = tPoint.x;
            if (xx < vh/2.0) {
                xx = vh/2.0;
            }
            
            if (xx > self.frame.size.width - vh/2.0) {
                xx = self.frame.size.width - vh/2.0;
            }
            center.x = xx;
            onOffBtn.center = center;
            timeLabel.backgroundColor = [UIColor colorWithRed:0/255.0 green:47/255.0 blue:108/255.0 alpha:xx/self.frame.size.width];
        }
    }
}

- (void)touchesEnded:(NSSet<UITouch *> *)touches withEvent:(UIEvent *)event
{
    [self updateViews];
}

- (void)touchesCancelled:(NSSet<UITouch *> *)touches withEvent:(UIEvent *)event
{
    [self updateViews];
}

- (void)updateViews
{
    onOffBtn.selected = NO;
    [UIView animateWithDuration:.2 animations:^{
        CGPoint center = onOffBtn.center;
        if (center.x > self.frame.size.width/2.0) {
            [self openClock];
        } else {
            [self closeClock];
        }
    }];
}

- (void)updateTime
{
    timeLabel.text = [NSString stringWithFormat:@"%@:%@", [DCUtil supplementString:@(_hour)], [DCUtil supplementString:@(_minute)]];
}

- (void)openClock
{
    _isOpen = YES;
    CGPoint center = onOffBtn.center;
    center.x = self.frame.size.width - vh/2.0;
    onOffBtn.center = center;
    timeLabel.backgroundColor = [UIColor colorWithRed:0/255.0 green:47/255.0 blue:108/255.0 alpha:1];
    CGFloat size = [[UIDevice currentDevice] userInterfaceIdiom]==UIUserInterfaceIdiomPad?42:26;
    timeLabel.font = [UIFont fontWithName:@"Labrador-A-Black" size:size];
    timeLabel.text = [NSString stringWithFormat:@"%@:%@", [DCUtil supplementString:@(_hour)], [DCUtil supplementString:@(_minute)]];
    
    if (_delegate && [_delegate respondsToSelector:@selector(alarmView:openClock:)]) {
        [_delegate alarmView:self openClock:_isOpen];
    }
}

- (void)closeClock
{
    _isOpen = NO;
    CGPoint center = onOffBtn.center;
    center.x = vh/2.0;
    onOffBtn.center = center;
    timeLabel.backgroundColor = [UIColor colorWithRed:0/255.0 green:47/255.0 blue:108/255.0 alpha:0];
    CGFloat size = [[UIDevice currentDevice] userInterfaceIdiom]==UIUserInterfaceIdiomPad?24:15;
    timeLabel.font = [UIFont boldSystemFontOfSize:size];
    timeLabel.text = @"自然唤醒";
    
    if (_delegate && [_delegate respondsToSelector:@selector(alarmView:openClock:)]) {
        [_delegate alarmView:self openClock:_isOpen];
    }
}

- (void)drawRect:(CGRect)rect
{
    CGContextRef context = UIGraphicsGetCurrentContext();
    CGContextSetLineWidth(context, lw);
    CGContextSetRGBStrokeColor(context, 255/255.0, 255/255.0, 255/255.0, 0.5f);
    
    CGAffineTransform transform = CGAffineTransformMakeTranslation(0, 0);
    
    
    CGMutablePathRef path = CGPathCreateMutable();
    
    // 左半圆
    CGPathAddArc(path, &transform, vh/2.0, vh/2.0, vh/2.0 - lw/2.0, -0.5 * M_PI, 0.5 * M_PI, YES);
    
    // 右半圆
    CGPathMoveToPoint(path, &transform, self.frame.size.width - vh/2.0, lw/2.0);
    CGPathAddArc(path, &transform, self.frame.size.width - vh/2.0, vh/2.0, vh/2.0 - lw/2.0, -0.5 * M_PI, 0.5 * M_PI, NO);
    
    // 上横线
    CGPathMoveToPoint(path, &transform, vh/2.0, lw/2.0);
    CGPathAddLineToPoint(path, &transform, self.frame.size.width - vh/2.0, lw/2.0);
    
    // 下横线
    CGPathMoveToPoint(path, &transform, vh/2.0, vh - lw/2.0);
    CGPathAddLineToPoint(path, &transform, self.frame.size.width - vh/2.0, vh - lw/2.0);
    
    CGContextAddPath(context, path);
    [[UIColor clearColor] setFill];
    [[UIColor colorWithWhite:1 alpha:.5] setStroke];
    
    
    //执行绘画
    
    CGContextDrawPath(context, kCGPathFillStroke);
}

@end
