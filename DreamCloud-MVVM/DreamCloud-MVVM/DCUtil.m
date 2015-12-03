//
//  DCUtil.m
//  DreamCloud
//
//  Created by 张玉龙 on 15/11/19.
//  Copyright © 2015年 soundario. All rights reserved.
//

#import "DCUtil.h"

@implementation DCUtil

+ (NSString *)supplementString:(id)obj
{
    NSString *str = [NSString stringWithFormat:@"%@", obj];
    if (str.length == 1) {
        str = [@"0" stringByAppendingString:str];
    }
    return str;
}

@end
