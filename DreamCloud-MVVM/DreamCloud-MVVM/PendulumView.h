//
//  PendulumView.h
//  DreamCloud
//
//  Created by 张玉龙 on 15/11/14.
//  Copyright © 2015年 soundario. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface PendulumView : UIImageView

@property (assign) BOOL isPlayAnimation;

- (void)startPendulumAnimation;

- (void)stopPendulumAnimation;

@end
