//
//  ClockView.m
//  DreamCloud
//
//  Created by 张玉龙 on 15/11/14.
//  Copyright © 2015年 soundario. All rights reserved.
//

#import "ClockView.h"
#import "PendulumView.h"

@implementation ClockView
{
    PendulumView *_pendulumView;
}

+ (CGFloat)getClockAngle:(CGFloat)hour minute:(CGFloat)min
{
    CGFloat angle = 0;
    if (hour > 12) {
        hour = hour - 12;
        angle += 2 * M_PI;
    }
    
    angle += (hour/12.0) *(2 *M_PI);
    angle += (min/60.0) * (2 * M_PI / 12.0);
    return angle - 0.5 * M_PI;
}



+ (NSDateComponents *)getNowDate
{
    NSDate *nowDate = [NSDate date];
    NSCalendar *calendar = [NSCalendar currentCalendar];
    unsigned int unitFlags = NSCalendarUnitHour|NSCalendarUnitMinute;
    NSDateComponents *day = [calendar components:unitFlags fromDate:nowDate];
    return day;
}

+ (int)getNowHour
{
    NSDateComponents *date = [self getNowDate];
    return (int)[date hour];
}

+ (int)getNowMinute
{
    NSDateComponents *date = [self getNowDate];
    return (int)[date minute];
}


- (id)initWithFrame:(CGRect)frame
{
    self = [super initWithFrame:frame];
    if (self) {
        int hour = [ClockView getNowHour];
        int min = [ClockView getNowMinute];
        _startAngle = [ClockView getClockAngle:hour minute:min];
        [self initSubViews];
    }
    return self;
}

- (void)setFrame:(CGRect)frame
{
    [super setFrame:frame];
    [self initSubViews];
}

- (void)initSubViews
{
    CGFloat w = self.frame.size.width;
    CGFloat h = self.frame.size.height;
    
    if (_pendulumView) {
        [_pendulumView removeFromSuperview];
    }
    _pendulumView = [[PendulumView alloc] initWithFrame:CGRectMake(w/2 - w/8.0, h/10.0 - (2*h/3.0), w/4.0, 4*h/3)];
    _pendulumView.image = [UIImage imageNamed:@"pendulum.png"];
    _pendulumView.contentMode = UIViewContentModeScaleAspectFit;
    
    [self addSubview:_pendulumView];
}

- (void)clockAppear
{
    if (_pendulumView.isPlayAnimation) {
        [_pendulumView startPendulumAnimation];
    }
}

- (void)startAnimation
{
    if (!_pendulumView.isPlayAnimation) {
        [self showAnimation:YES];
    }
}

- (void)stopAnimation
{
    if (_pendulumView.isPlayAnimation) {
        [self showAnimation:NO];
    }
}

- (void)showAnimation:(BOOL)isAnimation
{
    if (!isAnimation) {
        [_pendulumView stopPendulumAnimation];
    } else {
        [_pendulumView startPendulumAnimation];
    }
    if (_delegate && [_delegate respondsToSelector:@selector(clockView:click:)]) {
        [_delegate clockView:self click:isAnimation];
    }
}

- (void)touchesBegan:(NSSet<UITouch *> *)touches withEvent:(UIEvent *)event
{
    [self showAnimation:!_pendulumView.isPlayAnimation];
}

- (void)drawRect:(CGRect)rect
{
    CGFloat h = rect.size.height;
    CGFloat lw = h/30.0;
    
    CGContextRef context = UIGraphicsGetCurrentContext();
    
    CGContextSetRGBStrokeColor(context, 255/255.0, 255/255.0, 255/255.0, 0.33);
    CGContextSetLineWidth(context, lw);
    CGContextAddArc(context, rect.size.width/2.0, h/2.0, h/2.0-lw/2, 0, 2 * M_PI, 0);
    CGContextDrawPath(context, kCGPathStroke);
    
    if (_showTimer) {
        CGFloat startAngle = _startAngle;
        CGFloat stopAngle = _stopAngle;
        
        CGContextSetRGBStrokeColor(context, 255/255.0, 255/255.0, 255/255.0, 1);
        
        CGFloat a = startAngle;
        CGFloat b = stopAngle;
        
        // 4 * M_PI - a + b > 2 *M_PI && 4 * M_PI - a + b < 4 * M_PI
        if (b > a - 2 *M_PI && b < a) {
            CGContextAddArc(context, rect.size.width/2.0, h/2.0, h/2.0-lw/2.0, 0, 2 * M_PI, 0);
        } else {
            CGContextAddArc(context, rect.size.width/2.0, h/2.0, h/2.0-lw/2.0, startAngle, stopAngle, 0);
        }
        
        CGContextDrawPath(context, kCGPathStroke);
        
        // 起点圆弧
        CGFloat r = h/2.0 - lw/2;
        CGFloat x = lw/2 + r + r * cos(2 * M_PI - startAngle);
        CGFloat y = lw/2 + r - r * sin(2 * M_PI - startAngle);
        CGContextAddArc(context, x, y, lw/2, 0, 2 * M_PI, 0);
        CGContextSetRGBFillColor(context, 255/255.0, 255/255.0, 255/255.0, 1);
        CGContextDrawPath(context, kCGPathFill);
        
        // 终点圆弧
         x = lw/2 + r + r * cos(2 * M_PI - stopAngle);
         y = lw/2 + r - r * sin(2 * M_PI - stopAngle);
        CGContextAddArc(context, x, y, lw/2, 0, 2 * M_PI, 0);
        CGContextSetRGBFillColor(context, 255/255.0, 255/255.0, 255/255.0, 1);
        CGContextDrawPath(context, kCGPathFill);
    }
}

@end
