#include <stdio.h>
#include <unistd.h>
#include <stdlib.h>

int main(int argc, char *argv[]) {
fprintf(stdout, "Process Id: %d \n", getpid());
fprintf(stdout, "Parent Process Id: %d \n", getppid());
fprintf(stderr, "MODE is %s\n", getenv("MODE"));

char c;
while((c=fgetc(stdin))!=EOF) {
    fprintf(stdout, "data coming from c program: %c", c);
    fflush(stdout);
}

    return 0;

}