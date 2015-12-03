//
//  ViewController.h
//  DreamCloud-MVVM
//
//  Created by danney on 15/12/3.
//  Copyright © 2015年 soundario. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "ClockView.h"
#import "AlarmView.h"

@interface ViewController : UIViewController

@property (weak, nonatomic) IBOutlet UILabel *timeLabel;

@property (weak, nonatomic) IBOutlet ClockView *clockView;

@property (weak, nonatomic) IBOutlet AlarmView *alarmSwitcher;

@end

