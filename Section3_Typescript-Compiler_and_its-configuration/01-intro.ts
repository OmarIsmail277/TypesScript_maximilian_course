/*
In this section here, we'll explore

how you can manage projects with TypeScript,

and most importantly, how you can configure

how TypeScript behaves, how type checking works,

and how the code gets compiled.
*/

// tsc --init

// type-checking

/*
tsconfig.json file to enable some "quality of life" checks - checks that are not directly related to types but that can help you improve your code quality.



{
  "noUnusedLocals": true, // helps you detect unused variable
  "noUnusedParameters": true, // helps you detect unused function parameters
  "noFallthroughCasesInSwitch": true // helps you detect switch cases without break or return
}

*/
