#include <stdio.h>
#include <unistd.h>
#include <stdlib.h>

int main(int argc, char *argv[]) {
printf("Process Id: %d \n", getpid());
printf("Parent Process Id: %d \n", getppid());
printf("MODE is %s\n", getenv("MODE"));

for (int i = 0; i < argc; i++) {
        printf("Argument %d: %s\n", i, argv[i]);
    }
    return 0;

}