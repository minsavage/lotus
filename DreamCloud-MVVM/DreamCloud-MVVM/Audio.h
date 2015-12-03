//
//  Audio.h
//  DreamCloud-MVVM
//
//  Created by danney on 15/12/3.
//  Copyright © 2015年 soundario. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface Audio : NSObject

@property (strong, nonatomic) NSString *objectId;
@property (strong, nonatomic) NSString *name;
@property (strong, nonatomic) NSString *picBkgUrl;
@property (strong, nonatomic) NSString *picCoverUrl;
@property (strong, nonatomic) NSString *audioMixUrl;
@property (strong, nonatomic) NSString *audioMusicUrl;
@property (strong, nonatomic) NSString *audioVoiceUrl;
@property (strong, nonatomic) NSString *audioBkgUrl;
@property (strong, nonatomic) NSString *audioAlarmUrl;
@property (nonatomic)         NSInteger pubStatus;

@end
