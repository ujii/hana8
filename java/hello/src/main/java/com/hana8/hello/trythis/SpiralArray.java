package com.hana8.hello.trythis;

import java.util.Scanner;

public class SpiralArray {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("크기를 입력하세요 >>> ");
        int n = sc.nextInt(); // 배열 크기
        int[][] arr = new int[n][n];

        int num = 1; // 시작 숫자
        int top = 0, bottom = n - 1;
        int left = 0, right = n - 1;

        while (num <= n * n) {
            // 위쪽 행 (왼쪽 → 오른쪽)
            for (int i = left; i <= right; i++) {
                arr[top][i] = num++;
            }
            top++;

            // 오른쪽 열 (위 → 아래)
            for (int i = top; i <= bottom; i++) {
                arr[i][right] = num++;
            }
            right--;

            // 아래쪽 행 (오른쪽 → 왼쪽)
            for (int i = right; i >= left; i--) {
                arr[bottom][i] = num++;
            }
            bottom--;

            // 왼쪽 열 (아래 → 위)
            for (int i = bottom; i >= top; i--) {
                arr[i][left] = num++;
            }
            left++;
        }

        // 배열 출력
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                System.out.printf("%3d ", arr[i][j]);
            }
            System.out.println();
        }
    }
}
