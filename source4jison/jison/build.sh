#!/bin/bash
jison model.jison && cp model.js ../parser/model.js && rm model.js
jison operator.jison && cp operator.js ../parser/operator.js && rm operator.js
jison viewModel.jison && cp viewModel.js ../parser/viewModel.js && rm viewModel.js
jison viewController.jison && cp viewController.js ../parser/viewController.js && rm viewController.js